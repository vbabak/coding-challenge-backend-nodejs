# JOIN server-template-public

```bash
yarn sequelize-cli db:migrate

curl -i http://localhost:4000/cases
curl -i http://localhost:4000/cases/1

curl -i -H "Content-type: application/json" -X POST -d '{"email": "bikeowner1@email.com", "phone": "123", "first_name": "John", "last_name": "Doe", "description": "nice green bike"}' http://localhost:4000/cases

curl -i -H "Content-type: application/json" -X POST -d '{"email": "police1@email.com", "first_name": "John", "last_name": "Doe"}' http://localhost:4000/officers

curl -i -H "Content-type: application/json" -X PATCH -d '{"status": "succeeded"}' http://localhost:4000/cases/1

```

