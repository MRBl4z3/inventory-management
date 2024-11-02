
# Inventaris

Projek "inventaris" memudahkan anda untuk memanajemen alur keluar masuk barang antara supplier dan pembeli.




## Pre-requisite

Make sure you have nodejs installed

Install pnpm with npm :

```bash
  npm install -g pnpm
```

Turn on **Apache** and **MySQL** module in **Xampp**
## Installation

To install project dependency :

```bash
  pnpm install
```
## Environment Variable

Make to create .env at the root of the project with :

```bash
  DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
  NEXTAUTH_SECRET=RANDOM_SECRET
```


## Database Migration

To make database sync with prisma scheme run :

```bash
  pnpm exec prisma migrate dev
```
## Running Production Build

Generate Production build

```bash
  pnpm run build
```

Starting Project

```bash
  pnpm start
```