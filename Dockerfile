FROM fedora
MAINTAINER http://fedoraproject.org/wiki/Cloud

# ATOMIC CLI run command
LABEL RUN='docker run -d -p 8080:8080 $IMAGE'

# Install nodejs and npm
RUN dnf -y update && dnf -y install npm && dnf clean all

# Set port for nodejs to listen on and expose it
ENV PORT 8080
EXPOSE 8080 3000

# Set production environment for nodejs application
ENV PATH=/src/node_modules/.bin/:$PATH

# Make directory for our nodejs project
RUN mkdir /src

# Inject package.json into directory and install all dependencies required
# to be cached in order of making future builds faster
WORKDIR /src

ADD package.json /src
RUN npm install

# Add code of our nodejs project with respect to gitignore
ADD . /src

# Run it!
CMD ["npm", "start"]
