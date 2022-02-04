forfiles /M *.css /C "call:do "@FILE""

:do <filename>
echo "@charset 'UTF-8';" > tmp.txt
type %1 >> tmp.txt
type tmp.txt > %1
