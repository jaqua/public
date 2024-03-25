# Fileoverview    Generates nx applications and libraries in new workspace
# Author          Dr. J. Quader
# Version         1.0.0 (25.03.2024)
# Usage           python3 tools/scripts/generate.py

import json
import os
import subprocess

# Input list
list = [
    ("project.de", "nest", "app", "api", { "docker": "admin,upload" }),
    ("project.de", "next", "app", "main", { "docker": "admin,upload" }),
    ("project.de", "next", "app", "editor", { "docker": "admin,upload" }),
    ("project.de", "react-native", "app", "mobile", {}),
    ("project.de", "js", "util", "cache", { "short": True}),
    ("project.de", "js", "util", "config", { "short": True}),
    ("project.de", "js", "util", "factories", { "short": True}),
    ("project.de", "js", "util", "graphql", { "short": True}),
    ("project.de", "js", "util", "notecard", {}),
    ("project.de", "js", "util", "theme", { "short": True}),
    ("shared", "js", "data-access", "auth", {}),
    ("shared", "js", "data-access", "db", {}),
    ("shared", "js", "util", "apollo-link", {}),
    ("shared", "js", "util", "auth", {}),
    ("shared", "js", "util", "auth-guard", {}),
    ("shared", "js", "util", "calculation", {}),
    ("shared", "js", "util", "check", {}),
    ("shared", "js", "util", "cookie", {}),
    ("shared", "js", "util", "date", {}),
    ("shared", "js", "util", "factories", {}),
    ("shared", "js", "util", "formatting", {}),
    ("shared", "js", "util", "generator", {}),
    ("shared", "js", "util", "graphql", {}),
    ("shared", "js", "util", "media", {}),
    ("shared", "js", "util", "mongodb", {}),
    ("shared", "js", "util", "parsing", {}),
    ("shared", "js", "util", "regex", {}),
    ("shared", "js", "util", "testing", {}),
    ("shared", "js", "util", "theme", {}),
    ("shared", "react", "feat", "admin", {}),
    ("shared", "react", "feat", "backend", {}),
    ("shared", "react", "feat", "form", {}),
    ("shared", "react", "feat", "layout", {}),
    ("shared", "react", "feat", "login", {}),
    ("shared", "js", "feat", "admin", { "module": True}),
    ("shared", "js", "feat", "common", { "module": True})
]

# Exception handler
def handler(func, path, exc_info):
    print(exc_info)

# Function to add deploy element to target in project.json
def write_project_deploy_target(scope, name, docker, directory):
    with open('/'.join(["tmp", "nx-workspace", directory, "project.json"]),'r+') as file:
        file_data = json.load(file)
        file_data["targets"]["deploy"] = {
            "executor": "nx:run-commands",
            "options": {
                "commands": [
                    f"NEXT_PUBLIC_VERSION=$(cat apps/{scope}/{name}/.version) nx run {scope}-{name}:build:production",
                    f"./tools/scripts/dockerize.sh {scope}-{name} {scope}/{name} {docker} &> logs/dockerize/{scope}-{name}.log"
                ],
                "parallel": False
            }
        }
        file.seek(0)
        json.dump(file_data, file, indent = 2)

# Function to create NX generate command
def create_nx_command(scope, plugin, type, name):
    command = ["npx nx generate"]
    if type == "app":
        command.extend([f"@nx/{plugin}:application"])
        if plugin == "nest":
            command.extend([f"--directory=apps/{scope}", "--strict=true"])
        elif plugin == "next":
            command.extend([f"--directory=apps/{scope}", "--projectNameAndRootFormat=derived", "--appDir=false", "--e2eTestRunner=cypress", "--style=none"])
        elif plugin == "react-native":
            command.extend([f"--directory={scope}", f"--displayName={scope}"])
    else:
        command.extend([f"@nx/{plugin}:library", "--projectNameAndRootFormat=derived", "--minimal=true", "--simpleName=true", "--unitTestRunner=jest"])
        if type == "react":
            command.extend(["--component=false", "--style=none"])

        if options.get('module') == True: 
            command.append(f"--directory=libs/{scope}/{type}/module")
        else:
            command.append(f"--directory=libs/{scope}/{type}")

        if options.get('short') == True: 
            command.append(f"--importPath=@jaqua/{scope}/{name}")
        else:
            command.append(f"--importPath=@jaqua/{scope}/{type}/{name}")

    command.extend([f"--name={name}", f"--tags=scope:{scope},type:{type}", "--no-interactive"])
    return command

# Create new temp NX workspace
if os.path.isdir("tmp/nx-workspace"):
    # sys.exit('Temporary NX workspace already existing')
    print("Temporary NX workspace already existing")
else:
    subprocess.call("npx create-nx-workspace@latest nx_workspace --name jaqua --preset apps --cli nx --packageManager npm --e2eTestRunner cypress --nxCloud skip --skipGit true --workspaceType package-based --no-interactive", shell=True, cwd='tmp')

# Iterate through the input list to create directories/files
for scope, plugin, type, name, options in list:
    command = create_nx_command(scope, plugin, type, name)

    # Path to application/library
    if type == "app":
        directory = f"apps/{scope}/{name}"
    else:
        directory = f"libs/{scope}/{name}"

    # Check if directory is already existing, else...
    if os.path.isdir(f"tmp/nx-workspace/{directory}"):
        print(directory + ' is already existing')
    else:
        subprocess.call(' '.join(command), shell=True, cwd='tmp/nx-workspace') # Generate application/library
    if type == "app" and plugin != "react-native":
        # Add 'deploy' to 'targets' in project.json
        docker = options.get('docker', '')
        write_project_deploy_target(scope, name, docker, directory)
