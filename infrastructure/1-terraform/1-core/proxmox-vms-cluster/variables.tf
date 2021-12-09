variable "pve_address" {
  type        = string
  sensitive   = true
  description = "Proxmox host address"
}

variable "pve_api_token_id" {
  type        = string
  sensitive   = true
  description = "Proxmox host api token id"
}

variable "pve_api_token_secret" {
  type        = string
  sensitive   = true
  description = "Proxmox host api token"
}

variable "pve_tls_insecure" {
  type        = bool
  default     = true
  description = "Use a not valid TLS certificate to connect to the proxmox host"
}

variable "administration_ssh_public_keys" {
  type        = list(string)
  sensitive   = true
  description = "List of ssh keys that will be allowed to connect to the virtual machines"
}

variable "administration_ssh_private_key" {
  type        = string
  sensitive   = true
  description = "Administration ssh key"
}

variable "cluster_name" {
  type        = string
  default     = "default-cluster"
  description = "Cluster name"
}

variable "bridge" {
  type        = string
  default     = "vmbr0"
  description = "Network name on which virtual machines will be attached"
}

variable "vm_target_node" {
  type        = string
  default     = "pve"
  description = "Proxmox node on which virtual machines will be created"
}

variable "vm_disk_format" {
  type        = string
  default     = "qcow2"
  description = "Disk format used by future virtual machines"
}

variable "vm_template_name" {
  type        = string
  description = "Template name from which nodes will be cloned"
}

variable "administration_user" {
  type        = string
  default     = "terraform"
  description = "Administration user used for ssh connections and created administration accounts"
}

variable "administration_domain" {
  type        = string
  description = "Administration (private advised) domain where nodes will be installed"
}

variable "nodes" {
  type = map(object({
    vm_public_address    = string
    vm_interal_address   = string
    vm_mac_address       = string
    vm_cores             = number
    vm_sockets           = number
    vm_memory            = number
    vm_disk_size         = string
    vm_disk_storage_pool = string
  }))
  description = "Nodes parameters"
}
