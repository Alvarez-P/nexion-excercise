[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<h2 align="center">NEXION Challenge Node Backend</h2>

### Description

Se requiere una API para un sistema de tiendas, donde cada sucursal tenga su stock, como también pueda
revisar sus ventas, los productos deben de tener categoría, ejemplo: Lácteos, Refrescos, la API debe contener
documentación, seguridad por token paginación para cada servicio, Se deberá contar con pruebas de código
(recomendamos usar jest, supertes), se deberá también contar con un ORM (recomendación Sequelize) para
todo el acceso a datos.

## Solution 

### Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install)

### App commands

```bash
# run
$ docker-compose up -d

# stop
$ docker-compose down
```

### Test

Install dependencies for tests

```bash
$ npm install
```

```bash
# all tests
$ npm run test

# unit tests
$ npm run test:unit

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Notes

API documentation is available by running the app and going to the link `http://localhost:5000/api/docs`

### Flow description

`baseUrl` = `http://localhost:5000/api`

1. Sign in on `{baseUrl}/auth/signin`
2. Add branch office on `{baseUrl}/branch-offices`
3. Add product category on `{baseUrl}/product-categories`
4. Add product on `{baseUrl}/products` using the product category id
5. Add stock on `{baseUrl}/stock` using the product id and branch office id
6. Add sale order on `{baseUrl}/sale-orders` using the branch office id
7. Append sales to the sale order on `{baseUrl}/sales` using the sale order id and product id
8. Set as paid or cancelled a sale order on `{baseUrl}/sale-orders/{sale-order-id}/{cancel|pay}`
* Refresh the access token on `{baseUrl}/auth/refresh`

<p align="center">Made with ❤️ by <a href="https://github.com/alvarez-p">Esteban Alvarez</a></p>
