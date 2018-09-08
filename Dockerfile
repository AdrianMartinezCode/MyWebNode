
# What image we want to build from
FROM node:8

# Directory of the application code inside the image,
# this will be the working directory for your application
WORKDIR /usr/src/app



# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
RUN npm run build


#ENV PORT 3001
# Your app binds to port 8080 so you'll use the EXPOSE instruction 
# to have it mapped by the docker daemon
EXPOSE 3001

# Last but not least, define the command to run your app using CMD which 
# defines your runtime. Here we will use the basic npm start which will run 
# node server.js to start your server
CMD ["node", "dist/"]