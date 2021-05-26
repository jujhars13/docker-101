# Docker Basics
Repo used to teach docker Basics

## Outcomes

- [ ] Docker history and why docker
- [ ] Docker pull nodejs container
- [ ] create your own container
- [ ] explore container provenance
- [ ] create web app
- [ ] push to docker hub

## Links

- [Ready made node web app](https://gist.github.com/jujhars13/e978bae3ead9d066d0da07119a26b10f)
- [Ready made Go app](https://gist.github.com/jujhars13/eed249121b1e3c62663f291639298012)

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
- CPU overhead is negligable, no VM overhead, no operating system overhead

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