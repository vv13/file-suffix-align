# file-suffix-align
Delete all files with incomplete suffixes.

## Usage
In my scenario, I have photos in .JPG and .nef suffix, so when I deleting photos at JPG, I wish nef photos automatically to be deleted.

so I defined `SUFFIXES`, and run script in workspace.
```
SUFFIXES=.JPG,.nef npx file-suffix-align
```
