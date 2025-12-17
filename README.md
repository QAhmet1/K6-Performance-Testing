## K6 Performance Testing Framework (Portfolio Project)

This project is a **portfolio-grade performance testing framework** built with **k6**, **Docker**, **InfluxDB**, and **Grafana**.  
It is designed to demonstrate end-to-end performance testing capabilities that you can showcase in your CV / portfolio.

### Features

- **Modern test structure with k6**: separate scripts for each test type.
- **Multiple test types** (with clear documentation inside each file):
  - **Load test** – validates performance under expected traffic.
  - **Stress test** – finds system breaking points and stability limits.
  - **Spike test** – checks recovery from sudden traffic bursts.
  - **Endurance (soak) test** – detects memory leaks and long-term degradation.
- **Dockerized monitoring stack**: InfluxDB + Grafana with persistent volumes.
- **Simple npm scripts** to run tests and manage Docker services.
- **Environment-variable based configuration** prepared for future secure credentials storage.

---

### Project Structure

- **`scripts/load-test.js`**: Load test scenario.
- **`scripts/stress-test.js`**: Stress test scenario.
- **`scripts/spike-test.js`**: Spike test scenario.
- **`scripts/endurance-test.js`**: Endurance (soak) test scenario.
- **`docker-compose.yml`**: InfluxDB + Grafana monitoring stack.
- **`package.json`**: npm scripts to run k6 tests and control Docker services.

Inside each `scripts/*.js` file you will find **English comments** that briefly explain the **purpose** of the test and its configuration.

---

### Prerequisites

- **Docker** and **Docker Compose v2** (`docker compose` command).
- **Node.js** and **npm** (for running helper scripts).
- **k6** installed locally (`k6` CLI) *or* Docker available to run k6 via container.

---

### Install Node Dependencies

From the project root:

```bash
npm install
```

There are currently no JS dependencies, but this installs the project and makes npm scripts available.

---

### Running the Monitoring Stack (Docker & Grafana)

#### Start services

```bash
npm run docker:up
```

This will start:

- **InfluxDB** on `http://localhost:8086`
- **Grafana** on `http://localhost:3000`

#### Stop services

```bash
npm run docker:down
```

#### Restart services

```bash
npm run docker:restart
```

#### View logs

```bash
npm run docker:logs:influxdb
npm run docker:logs:grafana
```

---

### Running the k6 Performance Tests

Each test type has its own script and npm command.

#### Load test

```bash
npm run test:load
```

#### Stress test

```bash
npm run test:stress
```

#### Spike test

```bash
npm run test:spike
```

#### Endurance (soak) test

```bash
npm run test:endurance
```

#### Run all tests sequentially

```bash
npm run test:all
```

> Note: By default the scripts call `k6 run ...`. If you prefer running k6 via Docker, you can adapt the npm scripts to use `docker run grafana/k6` instead.

---

### Grafana Dashboard (K6 Performance Testing)

This project includes a ready-to-use **Grafana dashboard** that visualizes the most important performance metrics coming from k6 via InfluxDB. A typical dashboard setup contains four panels:

- **Active Virtual Users (VUs)**: shows how the number of virtual users changes over time (load pattern).
- **HTTP Error Rate (%)**: displays the percentage of failed HTTP requests (ideally stays at 0%).
- **HTTP Request Duration (Mean, ms)**: tracks the average response time of requests in milliseconds.
- **HTTP Throughput (Requests per Interval)**: represents how many HTTP requests are processed per time bucket (throughput).

You can take a screenshot of this dashboard after running a test (for example `npm run test:load`) and include it directly in your portfolio to demonstrate how you monitor **load, latency, errors, and throughput** in one view.

---

### Environment Variables & Future Credentials Strategy

This project is prepared to use **environment variables** for configuration and sensitive data.  
For example, the `docker-compose.yml` file supports overriding these variables from a local `.env` file:

- **`INFLUXDB_DB`** – InfluxDB database name (default: `k6`).
- **`INFLUXDB_ADMIN_USER`** – InfluxDB admin username (default: `k6_admin`).
- **`INFLUXDB_ADMIN_PASSWORD`** – InfluxDB admin password (default: `k6_admin_password`).
- **`GRAFANA_ADMIN_USER`** – Grafana admin username (default: `admin`).
- **`GRAFANA_ADMIN_PASSWORD`** – Grafana admin password (default: `admin`).

You can create a local `.env` file (not committed to git) with stronger secrets, for example:

```bash
INFLUXDB_DB=k6
INFLUXDB_ADMIN_USER=k6_admin
INFLUXDB_ADMIN_PASSWORD=very_strong_password_here
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=very_strong_password_here
```

> **Future extension (credentials for secured endpoints)**  
> When you start testing authenticated / private APIs, you can:
> - Store tokens, usernames, and passwords in the same `.env` file (e.g. `API_USERNAME`, `API_PASSWORD`, `API_TOKEN`).
> - Load them with `__ENV.VAR_NAME` inside k6 scripts to avoid hardcoding secrets in the code.
> - Optionally integrate **Docker secrets** or a dedicated secret manager (Vault, cloud provider secrets) for production-like setups.

This approach keeps the repository **clean and safe** while still allowing you to demonstrate **secure configuration practices** in your portfolio.

---

### How to Present This Project in Your Portfolio

You can highlight that this project:

- Implements **four core performance testing types** (load, stress, spike, endurance) using k6.
- Uses **Docker, InfluxDB, and Grafana** to build a complete monitoring stack.
- Provides **ready-to-run npm scripts** for tests and infrastructure.
- Is designed with **environment-based configuration** suitable for secure credentials management in real projects.


