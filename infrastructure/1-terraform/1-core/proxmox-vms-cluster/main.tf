# Configure proxmox provider
provider "proxmox" {
  pm_api_url          = "https://${var.pve_address}:8006/api2/json"
  pm_api_token_id     = var.pve_api_token_id
  pm_api_token_secret = var.pve_api_token_secret
  pm_tls_insecure     = var.pve_tls_insecure
}

# Create a cloudinit configuration data per vm
data "template_file" "cloudinit_data" {
  for_each = var.nodes

  template = file("${path.module}/templates/cloud-init.yml")
  vars = {
    user                = var.administration_user
    ssh_authorized_keys = length(var.administration_ssh_public_keys) > 0 ? "ssh_authorized_keys:\n    - ${join("\n    - ", var.administration_ssh_public_keys)}" : ""
    hostname            = "${var.cluster_name}-${each.key}"
    domain              = var.administration_domain
  }
}

# Write a cloudinit configuration file per configuration data
resource "local_file" "cloudinit_file" {
  for_each = data.template_file.cloudinit_data

  content  = each.value.rendered
  filename = "${path.module}/.generated/${var.cluster_name}-${each.key}.cloudinit.yml"
}

# Clear existing cloudinit configuration files
resource "null_resource" "cloudinit_clear_remote" {
  for_each = local_file.cloudinit_file

  connection {
    type        = "ssh"
    user        = var.administration_user
    host        = var.pve_address
    private_key = var.administration_ssh_private_key
  }

  provisioner "remote-exec" {
    inline = [
      "rm /home/terraform/snippets${var.cluster_name}-${each.key}.cloudinit.yml"
    ]
    on_failure = continue
  }
}

# Send cloudinit configuration files to proxmox host by scp
resource "null_resource" "cloudinit_copy" {
  depends_on = [null_resource.cloudinit_clear_remote]

  for_each = local_file.cloudinit_file

  connection {
    type        = "ssh"
    user        = var.administration_user
    host        = var.pve_address
    private_key = var.administration_ssh_private_key
  }

  provisioner "file" {
    source      = each.value.filename
    destination = "snippets/${var.cluster_name}-${each.key}.cloudinit.yml"
  }
}

# Create vms
resource "proxmox_vm_qemu" "proxmox_vms" {
  depends_on = [
    null_resource.cloudinit_copy
  ]

  for_each = var.nodes

  name = "${var.cluster_name}-${each.key}"

  target_node = var.vm_target_node
  os_type     = "cloud-init"
  clone       = var.vm_template_name
  cicustom    = "user=terraform:snippets/${var.cluster_name}-${each.key}.cloudinit.yml"

  cpu     = "kvm64"
  sockets = each.value.vm_sockets
  cores   = each.value.vm_cores
  memory  = each.value.vm_memory
  numa    = true
  onboot  = true
  agent   = 1
  hotplug = "network,disk,usb,memory"

  bootdisk = "scsi0"
  scsihw   = "virtio-scsi-pci"
  disk {
    size    = each.value.vm_disk_size
    storage = each.value.vm_disk_storage_pool
    type    = "scsi"
    format  = "qcow2"
  }

  ipconfig0 = "ip=dhcp"
  network {
    bridge  = var.bridge
    macaddr = each.value.vm_mac_address
    model   = "virtio"
  }
}
