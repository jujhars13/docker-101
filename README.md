# Docker Basics
Repo used to teach docker Basics

## Outcomes 101

- [ ] Docker history and why docker
- [ ] Docker pull nodejs container
- [ ] create your own container
- [ ] explore container provenance
- [ ] create web app
- [ ] docker filesystem explore

## Outcomes 201

- [ ] push your container to docker hub
- [ ] Docker pull each others containers
- [ ] create container that needs a database
- [ ] docker-compose to co-ordinate multiple containers

### Notes

- Created a wrapper around Namespaces w/ a lovely api
- Documented everything
- Added a pacakge repository
- added a layered filesystem
- added networking magic - otherwise you had to be an iptables and linux networking wizzard
- container build mechanic
- cgroups - to put limits on ram and CPU and stuff

#### Benefits of containers

- much smaller RAM usage - no operating system overhead per container
- Startup time is measured in ms and seconds, VMs in minutes
- CPU and Memory overhead is negligable, VMs can chomp 30% of compute resource

#### Container commands

```bash
# show running containers
docker ps

# run an nginx container attached to port 80
docker run \
    -p 8080:80 \
    nginx

# kill a running container
docker kill <container_id>

# deep info on a container
docker inspect <container_id>

# build a container image
docker build \
    -t <image_name> \
    .
```
