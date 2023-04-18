#!/bin/sh
# (MIT) meugenom 2023

#############
# [major].[minor].[patch]-[build/beta/rc]
# details:  $ git show v1.5.0-beta
# last semver: $ git describe 
#############

#declare constants
readonly SEMVER_REGEX="^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)(\\-[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"

#get version
version=$(git describe)


#get parts of version
if [[ "$version" =~ $SEMVER_REGEX ]]; then
	old_major=${BASH_REMATCH[1]}
	old_minor=${BASH_REMATCH[2]}
	old_patch=${BASH_REMATCH[3]}
	old_prerelease=${BASH_REMATCH[4]}
	old_build=${BASH_REMATCH[5]}
	echo "Old version: " $old_major.$old_minor.$old_patch
fi

# get the first param from console (patch, minor, major)
case "$1" in
  patch)
    echo "Old patch number is $old_patch"
    new_patch=$((old_patch+1))
    echo "New patch number is $new_patch"
    new_version="$old_major.$old_minor.$new_patch"
    ;;
  minor)
    echo "Old minor number is $old_minor"
    new_minor=$((old_minor+1))
    echo "New minor number is $new_minor"
    new_patch=0
    new_version="$old_major.$new_minor.$new_patch"
    ;;
  major)
    echo "Old major number is $old_major"
    new_major=$((old_major+1))
    echo "New major number is $new_major"
    new_patch=0
    new_minor=0
    new_version="$new_major.$new_minor.$new_patch"
    ;;
  *)
    echo "Unknown parameter. Please use 'patch' or 'minor' or 'major'"
    exit 1
    ;;
esac


echo "New version is $new_version"

#modify version number for client and server
cd client || exit 1
file="package.json"

if [ ! -f "${package_file}" ]; then
	echo "file doesn't exist: ${package_file}"
	exit 1
fi

#BSD/OSX
if ! sed -i '' "s/\"version\": \"$old_major.$old_minor.$old_patch\"/\"version\": \"$new_version\"/" "$package_file"; then
  echo "Failed to modify $package_file"
  exit 1
fi

cd ../server || exit 1
pom_file="pom.xml"

if [ ! -f "${pom_file}" ]; then
	echo "File doesn't exist: $pom_file"
	exit 1
fi

# BSD/OSX
if ! sed -i '' "s/$old_version-SNAPSHOT/$new_version-SNAPSHOT/" "$pom_file"; then
  echo "Failed to modify $pom_file"
  exit 1
fi

cd ..
readme_file="README.md"

if [ ! -f "$readme_file" ]; then
	echo "file doesn't exist: $readme_file"
	exit 1
fi

# BSD/OSX
sed -i '' "s/version-${old_version}/version-${new_version}/" "${readme_file}"


#write new version as a tag
# git tag -a "0.1.1" -m "version 0.1.1"

git tag -a "${new_version}" -m "version ${new_version}"
git describe
 
#to delete old version 
#git tag -d "0.1.1"