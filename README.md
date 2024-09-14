## Project architecture

Packages:

- `discord-utils`: Common constants to be shared between the service and the caller.
- `eslint-config`: Eslint configuration for the project.
- `typescript-config`: Typescript configuration for the project.
- `ui`: The UI for the project, to be used by all the frontends.

Apps:

- `api`: The API for the project, to be used by all the frontends and the user service.
- `discord-service`: The service that interacts with the Discord API.
- `platform`: The frontend for the admin panel.
