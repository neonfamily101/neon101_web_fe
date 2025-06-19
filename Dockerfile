# Node.js LTS 이미지 사용
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# package.json 복사 후 설치
COPY package*.json ./
RUN npm install

# 전체 코드 복사
COPY . .

# Next.js 빌드
RUN npm run build

# 3000번 포트 사용
EXPOSE 8080

# 앱 실행
CMD ["npm", "start"]
