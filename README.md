# API para controle de estoque
Pier Cloud Teste

API com operaçãos para sistemas de estoque de produtos.


**Ferramentas:**
Server:express.js
Banco de dados: lowdb
Gerador de ID: uuid
Insominia
Docker

### Iniciando

 ```npm install```

 ```npm run init_server```

### Criar produto
post: "http://localhost:3001/api/products"

exemplo de request:
```
{
  "name": "Cadeira",
  "description": "Madeira, com estofado.",
  "warehouses": [{
      "warehouseId": "1",
      "amount": "10"
    },
    {
      "warehouseId": "2",
      "amount": "15"
    }
  ]
}
```
db:
```
{
  "products": [
    {
      "name": "Cadeira",
      "id": "30491d92-0669-4539-beba-1c8031db8311",
      "description": "Madeira, com estofado."
    }
  ]
  "productWarehouse": [
    {
      "productId": "30491d92-0669-4539-beba-1c8031db8311",
      "warehouseId": "1",
      "amount": "10"
    },
    {
      "productId": "30491d92-0669-4539-beba-1c8031db8311",
      "warehouseId": "2",
      "amount": "15"
    }
  ]
}
``` 
    

### Lista de produtos
get: "http://localhost:3001/api/products"

Retorno:
```
[
  {
    "name": "Cadeira",
    "id": "30491d92-0669-4539-beba-1c8031db8311",
    "description": "Madeira, com estofado.",
    "warehouses": [
      {
        "productId": "30491d92-0669-4539-beba-1c8031db8311",
        "warehouseId": "1",
        "amount": "10"
      },
      {
        "productId": "30491d92-0669-4539-beba-1c8031db8311",
        "warehouseId": "2",
        "amount": "15"
      }
    ]
  },
  {
    "name": "Mesa",
    "id": "f24e8f21-f60b-40bb-a6cd-b2e854a07381",
    "description": "Vidro trasparente.",
    "warehouses": [
      {
        "productId": "f24e8f21-f60b-40bb-a6cd-b2e854a07381",
        "warehouseId": "3",
        "amount": "5"
      },
      {
        "productId": "f24e8f21-f60b-40bb-a6cd-b2e854a07381",
        "warehouseId": "1",
        "amount": "10"
      }
    ]
  }
]
```
### Buscar produto por ID
get: "http://localhost:3001/api/product/:id"

exemplo:
http://localhosr:3001/api/product/30491d92-0669-4539-beba-1c8031db8311

retorno:
```
[
  {
    "name": "Cadeira",
    "id": "30491d92-0669-4539-beba-1c8031db8311",
    "description": "Madeira, com estofado.",
    "warehouses": [
      {
        "productId": "30491d92-0669-4539-beba-1c8031db8311",
        "warehouseId": "1",
        "amount": "10"
      },
      {
        "productId": "30491d92-0669-4539-beba-1c8031db8311",
        "warehouseId": "2",
        "amount": "15"
      }
    ]
  },
]
```

### Editar produto
* Editar caracteristicas do produto
put: "http://localhost:3001/api/product/:id"

exemplo:
http://localhosr:3001/api/product/30491d92-0669-4539-beba-1c8031db8311
 
request:
```
{
	"description": "Madeira de embuia."
}
```

db: 
```
{
  "products": [
    {
      "name": "Cadeira",
      "id": "30491d92-0669-4539-beba-1c8031db8311",
      "description": "Madeira de embuia."
    }
  ]
}
``` 
* Editar warehouse
put: "http://localhost:3001/api/product_warehouse/:id"
 
exemplo:
http://localhosr:3001/api/product/30491d92-0669-4539-beba-1c8031db8311
 
request:
```
{
	"warehouseId": "3"
}
```

db: 
```
{
  "productWarehouse": [
    {
      "productId": "30491d92-0669-4539-beba-1c8031db8311",
      "warehouseId": "3",
      "amount": "10"
    },
    {
      "productId": "30491d92-0669-4539-beba-1c8031db8311",
      "warehouseId": "2",
      "amount": "15"
    }
  ]
}
``` 

* Decrementar quantidade (venda)
put: "http://localhost:3001/api/product_amount_decrese/:id"

exemplo:
http://localhosr:3001/api/product/30491d92-0669-4539-beba-1c8031db8311
 
request:
```
{
	"sold": "1"
}
```

db: 
```
{
  "productWarehouse": [
    {
      "productId": "30491d92-0669-4539-beba-1c8031db8311",
      "warehouseId": "3",
      "amount": "9"
    },
    {
      "productId": "30491d92-0669-4539-beba-1c8031db8311",
      "warehouseId": "2",
      "amount": "15"
    }
  ]
}
```

### Excluir produto
delete: "http://localhost:3001/api/product/:id"

exemplo:
http://localhosr:3001/api/product/30491d92-0669-4539-beba-1c8031db8311
