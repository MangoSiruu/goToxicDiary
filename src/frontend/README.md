# React + Vite

## git 클론하고 브랜치 생성하는 법

로컬에서 FE/dev 브랜치 클론

```
git clone --branch FE/dev https://github.com/MangoSiruu/nonToxicDiary.git
또는
git clone -b FE/dev https://github.com/MangoSiruu/nonToxicDiary.git
```

올바른 경로로 이동

```
cd /src/frontend
```

브랜치 생성 및 확인

```
git checkout -b 브랜치명
git branch -v
```

커밋 후 push 하는 법

```
git add .
git commit -m "[작업태그] #이슈번호 - 작업내용"
git push origin 브랜치명
```

## How to start

```

cd /src/frontend
npm i
npm run dev

```

## 폴더구조

![alt text](image-1.png)
