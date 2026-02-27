# 🐳 Docker Deployment Guide

Complete guide for running the Online Course Platform with Docker.

## 📋 Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- 2GB+ free RAM
- 5GB+ free disk space

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone https://github.com/manishek14/onlineCourse-.git
cd N303-
```

### 2. Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your values
nano .env  # or use your preferred editor
```

**Important:** Change these values in `.env`:
- `JWT_SECRET` - Use a strong random string (min 32 characters)
- `JWT_REFRESH_SECRET` - Use a different strong random string
- `MONGO_ROOT_PASSWORD` - Set a secure MongoDB password
- `SMS_IR_API_KEY` - Your SMS.ir API key

### 3. Run with Docker Compose

```bash
# Production mode
docker-compose up -d

# Development mode with hot reload
docker-compose -f docker-compose.dev.yml up -d
```

### 4. Access the Application

- **Frontend:** http://localhost
- **Backend API:** http://localhost:3000
- **API Documentation:** http://localhost:3000/api-docs
- **Mongo Express:** http://localhost:8081 (dev mode only)

## 📦 Services

### Backend (Node.js + Express)
- Port: 3000
- Health check: http://localhost:3000/health
- Auto-restart on failure

### Frontend (React + Vite)
- Port: 80 (production) / 5173 (development)
- Nginx reverse proxy in production
- Hot reload in development

### MongoDB
- Port: 27017
- Persistent data storage
- Health checks enabled

### Mongo Express (Development only)
- Port: 8081
- Username: admin
- Password: admin123

## 🛠️ Docker Commands

### Start Services
```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d backend

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes data)
docker-compose down -v
```

### Rebuild Services
```bash
# Rebuild all services
docker-compose build

# Rebuild specific service
docker-compose build backend

# Rebuild and restart
docker-compose up -d --build
```

### View Status
```bash
# List running containers
docker-compose ps

# View resource usage
docker stats
```

### Execute Commands
```bash
# Access backend shell
docker-compose exec backend sh

# Access MongoDB shell
docker-compose exec mongodb mongosh -u admin -p admin123

# Run npm commands in backend
docker-compose exec backend npm install package-name
```

## 🔧 Development Mode

Development mode includes:
- Hot reload for backend (nodemon)
- Hot reload for frontend (Vite HMR)
- Mongo Express for database management
- Source code mounted as volumes

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop development environment
docker-compose -f docker-compose.dev.yml down
```

## 🏭 Production Deployment

### 1. Build Production Images
```bash
docker-compose build --no-cache
```

### 2. Configure Environment
- Set `NODE_ENV=production`
- Use strong secrets
- Configure proper MongoDB credentials
- Set up SSL/TLS certificates

### 3. Deploy
```bash
docker-compose up -d
```

### 4. Monitor
```bash
# Check health
docker-compose ps

# View logs
docker-compose logs -f

# Monitor resources
docker stats
```

## 🔒 Security Best Practices

1. **Change Default Passwords**
   - MongoDB root password
   - Mongo Express credentials
   - JWT secrets

2. **Use Environment Variables**
   - Never commit `.env` file
   - Use secrets management in production

3. **Network Security**
   - Use internal Docker networks
   - Expose only necessary ports
   - Implement rate limiting

4. **Regular Updates**
   ```bash
   docker-compose pull
   docker-compose up -d
   ```

## 📊 Monitoring & Logs

### View Logs
```bash
# All services
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100

# Specific service
docker-compose logs -f backend
```

### Health Checks
```bash
# Check backend health
curl http://localhost:3000/health

# Check all services
docker-compose ps
```

### Database Backup
```bash
# Backup MongoDB
docker-compose exec mongodb mongodump --out /data/backup

# Restore MongoDB
docker-compose exec mongodb mongorestore /data/backup
```

## 🐛 Troubleshooting

### Services Won't Start
```bash
# Check logs
docker-compose logs

# Check disk space
df -h

# Check Docker status
docker info
```

### Port Already in Use
```bash
# Find process using port
lsof -i :3000

# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use different host port
```

### Database Connection Issues
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Verify MongoDB is healthy
docker-compose ps mongodb

# Test connection
docker-compose exec backend node -e "require('./configs/db')()"
```

### Container Keeps Restarting
```bash
# View logs
docker-compose logs backend

# Check health
docker inspect course-platform-backend

# Disable restart for debugging
restart: "no"
```

## 🔄 Updates & Maintenance

### Update Application
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build
```

### Clean Up
```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove everything (WARNING)
docker system prune -a --volumes
```

## 📝 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | production | No |
| `PORT` | Backend port | 3000 | No |
| `MONGODB_URL` | MongoDB connection string | - | Yes |
| `JWT_SECRET` | JWT secret key | - | Yes |
| `JWT_REFRESH_SECRET` | Refresh token secret | - | Yes |
| `SMS_IR_API_KEY` | SMS.ir API key | - | Yes |
| `MONGO_ROOT_USERNAME` | MongoDB admin username | admin | No |
| `MONGO_ROOT_PASSWORD` | MongoDB admin password | - | Yes |

## 🆘 Support

For issues or questions:
- Check logs: `docker-compose logs`
- GitHub Issues: [Repository URL]
- Documentation: http://localhost:3000/api-docs

## 📄 License

MIT License - See LICENSE file for details
