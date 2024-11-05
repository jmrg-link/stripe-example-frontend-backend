# Aplicación de Pagos con Stripe

Esta es una aplicación de pagos desarrollada con Node.js y Stripe que permite procesar pagos con tarjetas de crédito y aplicar códigos promocionales.

## Configuración Inicial

1. Clona el repositorio
2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```bash
SERVER_PORT=3000
APIKEY_STRIPE=tu_clave_secreta_de_stripe
```

## Estructura del Proyecto

- `main.js`: Servidor Express principal
- `config.js`: Configuración de variables de entorno
- `setupStripe.js`: Configuración de códigos promocionales
- `routes/payment.routes.js`: Rutas de la API de pagos
- `controllers/payment.controllers.js`: Controladores de pagos

## Planes Disponibles

| ID | Plan | Precio (EUR) |
|----|------|--------------|
| 1 | Asistence plan 1 hour | 250.00€ |
| 2 | Asistence plan 2 hours Pack | 500.00€ |
| 3 | Asistence plan 5 hours Pack | 950.00€ |
| 4 | Asistence plan 10 hours Pack | 1,800.00€ |

## Códigos Promocionales

La aplicación incluye los siguientes códigos promocionales:

- `WELCOME10`: 10% de descuento en primera compra
- `WINTER20`: 20% de descuento en venta de invierno
- `FLASH50`: 50% de descuento en venta flash
- `FIXED25`: 25€ de descuento en la compra

## Pruebas con Tarjetas de Stripe

Para realizar pruebas, utiliza las siguientes tarjetas de prueba:

### Tarjetas de Prueba Básicas
- **Pago exitoso**: 4242 4242 4242 4242
- **Pago fallido**: 4000 0000 0000 0002
- **Requiere autenticación**: 4000 0025 0000 3155

### Datos para Pruebas
- **Fecha futura válida**: Cualquier fecha futura
- **CVC**: Cualquier número de 3 dígitos
- **Código postal**: Cualquier código postal válido

### Tarjetas por País/Región
- **España**: 4000 0087 0000 0000
- **Francia**: 4000 0082 0000 0000
- **Alemania**: 4000 0084 0000 0000

### Casos Específicos de Prueba
- **Fondos insuficientes**: 4000 0000 0000 9995
- **Tarjeta perdida**: 4000 0000 0000 9987
- **Tarjeta expirada**: 4000 0000 0000 0069

## Uso de la API

### Crear una Sesión de Pago

```bash
curl -X POST http://localhost:3000/api/v1/payment/create-checkout-session/1
```

### Endpoints Disponibles

- `POST /api/v1/payment/create-checkout-session/:planId`: Crea una sesión de pago
- `GET /api/v1/payment/success`: Página de pago exitoso
- `GET /api/v1/payment/cancel`: Página de pago cancelado

## Iniciar la Aplicación

1. Iniciar el servidor:
```bash
node main.js
```

2. Configurar los códigos promocionales:
```bash
node setupStripe.js
```

## URLs de la Aplicación

- Homepage: `http://localhost:3000`
- API endpoint: `http://localhost:3000/api/v1/payment`

## Manejo de Errores

La aplicación incluye manejo de errores para:
- Planes inválidos
- Errores en la creación de sesión de pago
- Errores en la creación de códigos promocionales

## Consideraciones de Desarrollo

- La aplicación está configurada para usar EUR como moneda predeterminada
- Los códigos promocionales tienen un límite de 100 usos
- Se incluye CORS configurado para permitir solicitudes de cualquier origen