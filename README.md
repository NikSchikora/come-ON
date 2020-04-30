# come-ON
Come-ON game for a Project at the DHBW Mosbach. This project displays a 2D-adventuregame built in the 
setting of the DHBW-universe

## Getting Started

To start working with this project, clone this repository into a new directory:

```bash
git clone git@github.com:NikSchikora/come-ON.git
```
then run an npm-install to fetch the requiered modules:

```bash
npm install
```

After that, your project is ready to go!

## NPM Scripts

This project cannot be run on a live-server anymore. To start working and watching your work,
you can use:

```bash
npm run start
```

This builds a temp version of the project into the dist folder. This temporary build ignores
new assets. To refresh the assets, use:

```bash
npm run refresh-assets
```

To finish a build-process you can run

```bash
npm run build
```

the final build can then be uploaded to a webserver.

## Resources

This project uses the Phaser HTML-Gameframework and the Parcel-Packetmanager
