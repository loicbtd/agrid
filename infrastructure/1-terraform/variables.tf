variable "pve_address" {
  type      = string
  sensitive = true
}

variable "pve_api_token_id" {
  type      = string
  sensitive = true
}

variable "pve_api_token_secret" {
  type      = string
  sensitive = true
}

variable "pve_tls_insecure" {
  type    = bool
  default = true
}

variable "administration_ssh_public_keys" {
  type      = list(string)
  sensitive = true
}

variable "administration_ssh_private_key" {
  type      = string
  sensitive = true
}

variable "tags" {
  type = map(string)
  default = {
    maintained_by = "terraform"
  }
}

variable "vm_template_name" {
  type = string
}

variable "cluster_name" {
  type = string
}

variable "administration_domain" {
  type = string
}

variable "administration_user" {
  type = string
}
