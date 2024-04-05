FROM node:latest

WORKDIR /var/www/Event_Eclipse

# Copy the wait-for-it.sh script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh


# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# CMD [ "node", "index.js" ]
# Modify your CMD or ENTRYPOINT to use wait-for-it.sh before starting your app
CMD ["/wait-for-it.sh", "db:3306", "--", "node", "index.js"]

