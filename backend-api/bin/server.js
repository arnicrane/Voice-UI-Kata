// Project Dependencies
import project from 'Config/project.config';
import server from 'Server/main';

server.listen(project.server.port);
console.log(`Server is now running at http://${project.server.host}:${project.server.port}.`);
