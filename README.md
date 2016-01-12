# ajfisher.me

Website for ajfisher.me

Uses metalsmith to produce the required elements.

Install:

```
git clone https://github.com/ajfisher/ajfisher.me
npm install
```

## Dependencies

### NodeJS

Metalsmith uses generators so either use harmony or just flip to 5.3.0

### Data

Used this to convert the output XML from WP to markdown.

https://github.com/thomasf/exitwp

Did this within a virtualenv and in a temp directory.

Changed line 240

```
filename_parts.append(target_format)
```

to:

```
filename_parts.append('md')
```

Just to make it explicitly work with .md which is a bit nicer to look at.

picked up the `build/_posts` files and put them in the repo.


## Custom meta data instructions

### Listings

* listimage: url to use for the listing pages and anywhere else it may be displayed
* listimage-position: % % vals to push image around to align it properly with `object-fit`
* collection: featured - to appear in featured collection list


### Blog page things

* featureimage: url for the header feature image if applicable
* imageby: person attribution for the image
* imagelink: attribution link for the image
* featured: (true) if you want it to appear in feature list
* excerpt: use with MD multiline `>` to create an excerpt or it will be pulled
from first proper para
