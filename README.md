# Trampo

Repositório contento o Projeto da Disciplina de Engenharia de Software do período 2018.2

**Link da hospedagem do Heroku** - https://trampo-projeto-es.herokuapp.com/

Neste repositório contém os projetos:

- Client: App feito a partir do Ionic Framework
- Server: Aplicação Backend feita a partir da ferramenta SpringBoot, contendo as tecnologias JAVA, Spring MVC, REST, JPA e PostgreSQL

Pré-requisitos para rodar os projetos

- Client
  * Node e NPM (https://nodejs.org/en/download/)
  * Ionic 3 (https://ionicframework.com/getting-started#cli)
  * Após as instalações acima, no diretório *client* executar o comando **_npm install_**, e em seguida, **_ionic serve_**
  
- Server
  * JDK 8 (http://www.oracle.com/technetwork/pt/java/javase/downloads/jdk8-downloads-2133151.html)
  * Maven (https://maven.apache.org/download.cgi) (https://maven.apache.org/install.html)
  * Para executar o projeto, é necessário apenas importar o projeto _server_ na sua IDE desejada (Eclipse ou IntelliJ) e executar o mesmo, ou então executar no diretório _server_ o comando **_./mvnw spring-boot:run_**
