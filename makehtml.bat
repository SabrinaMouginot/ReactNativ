rmdir /s /q html
mkdir html
for /r %%i in (*.md) do pandoc  "%%i" -t html -o "html\%%~ni.html"