#!/bin/sh
# (MIT) meugenom 2022

#############
# [major].[minor].[patch]-[build/beta/rc]
# details:  $ git show v1.5.0-beta
# last semver: $ git describe 
#############

#declare variables
SEMVER_REGEX="^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)(\\-[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"

#get version
version=`git describe`


#get parts of version
if [[ "$version" =~ $SEMVER_REGEX ]]; then
	major=${BASH_REMATCH[1]}
	minor=${BASH_REMATCH[2]}
	patch=${BASH_REMATCH[3]}
	prere=${BASH_REMATCH[4]}
	build=${BASH_REMATCH[5]}
	echo "major: " $major ", minor: " $minor ", patch: "  $patch
fi

#get the first param from colnsole (patch, minor, major)
str="$1"
str_patch="patch"
str_minor="minor"
str_major="major"
 
if [ "$str" == "$str_patch" ]; then
	echo "Old patch number is $patch"
	patch=$((patch+1))
	echo "New patch number is $patch"
else
	if [ "$str" == "$str_minor" ]; then
		echo "Old minor number is $minor"
		minor=$((minor+1))
		echo "New minor number is $minor"
		#base case
		#need to write patch to '0', because version of the patch is 0 for new minor changes
		patch="0"
	else
		if [ "$str" == "$str_major" ]; then
			echo "Old major number is $major"
			major=$((major+1))
			echo "New major number is $major"
			#base case
			#need to write patch to '0' and minor to '0', because it's global change
			patch="0"
			minor="0"
		else
			echo "Unknown Parameter. Please use 'patch' or 'minor' or 'major'"
			exit 1
		fi
	fi
fi

echo "New version is $major.$minor.$patch"
new_version="$major.$minor.$patch"

#modify version number for client and server
cd client
file="package.json"

if [ ! -f "${file}" ]; then
	echo "file doesn't exist: ${file}"
	exit 1
fi

#BSD/OSX
sed -i '' 's/"version": "'$version'"/"version": "'$new_version'"/' $file

cd ..
cd server
file="pom.xml"

if [ ! -f "${file}" ]; then
	echo "file doesn't exist: ${file}"
	exit 1
fi
#BSD/OSX
sed -i '' 's/'$version'-SNAPSHOT/'$major.$minor.$patch'-SNAPSHOT/' $file

cd ..
file="README.md"
if [ ! -f "${file}" ]; then
	echo "file doesn't exist: ${file}"
	exit 1
fi
#BSD/OSX
sed -i '' 's/version-'$version'/version-'$major.$minor.$patch'/' $file

#write new version as a tag
# git tag -a "0.1.1" -m "version 0.1.1"
git tag -a "$major.$minor.$patch" -m "version $major.$minor.$patch"
git describe
 
#to delete old version 
#git tag -d "0.1.1"