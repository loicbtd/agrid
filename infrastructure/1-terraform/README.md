# Global infrastructure

## 1. Configure proxmox host

### 1.1. Create administration ssh keys

> From shell

Create ssh public and private keys with the `ssh-keygen` command and store them into a secret management system.

### 1.2. Create proxmox host system ssh administration user

> From shell

- Create a ssh user named "terraform" with the `adduser` command
- Login as terraform
- Exexute `ssh-keygen`
- Create a ~/.ssh/authorized_keys file and add the previously generated administration public key

### 1.3. Create proxmox administration user

> From proxmox administration panel

- Create a user named "terraform"
- Create a API key owned by terraform
- Grant administration rights to the terraform user

### 1.4. Create new directory storage

- Navigate at the datacenter level of the proxmox administration panel
- Navigate to the storage section
- Select "Add" and "Directory"
- Id : terraform
- Directory : /home/terraform
- Content : Snippets
- Enable : checked
- Through shell cli, execute `chown terraform:terraform -R /home/terraform/snippets`

## 2. Define variables

- Create a not versioned terraform.tfvars in root of the directory <1-terraform>
- Copy and fill the variables into it

```conf
pve_address = <pm_api_url>
pve_api_token_id = <pm_api_token_id>
pve_api_token_secret = <pm_api_token_secret>
administration_ssh_public_keys = [
    "<administration_ssh_public_keys>"
]
administration_ssh_private_key = <<-EOF
<administration_ssh_private_key>
EOF
vm_template_name = <vm_template_name>
cluster_name = <cluster_name>
administration_domain = <administration_domain>
administration_user = <administration_user>
```

## 3. Check terraform config

- Check that the other parameters in the `main.tf` file match your needs

## 4. Use terraform

```shell
terraform init
terraform plan
terraform apply
```

# Troubleshooting

## Logging

- Powershell

```powershell
$env:TF_LOG="TRACE" # enable log
$env:TF_LOG="" # disable log
```

- Shell

```shell
export TF_LOG="TRACE" # enable log
export TF_LOG="" # disable log
```
