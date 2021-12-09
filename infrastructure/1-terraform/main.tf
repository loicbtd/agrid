module "proxmox_vms_cluster" {
  source = "./1-core/proxmox-vms-cluster"

  pve_address = var.pve_address

  pve_api_token_id = var.pve_api_token_id

  pve_api_token_secret = var.pve_api_token_secret

  pve_tls_insecure = var.pve_tls_insecure

  vm_template_name = var.vm_template_name

  cluster_name = var.cluster_name

  administration_domain = var.administration_domain

  administration_user = var.administration_user

  administration_ssh_public_keys = var.administration_ssh_public_keys

  administration_ssh_private_key = var.administration_ssh_private_key

  nodes = {
    "node-0" = {
      vm_public_address    = "192.168.1.16"
      vm_interal_address   = "192.168.1.16"
      vm_mac_address       = "e6:7f:34:cd:1f:20"
      vm_cores             = 4
      vm_sockets           = 2
      vm_memory            = 8192
      vm_disk_size         = "100G"
      vm_disk_storage_pool = "local-ext4-2"
    },
  }
}



