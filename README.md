# hypertrack-node

HyperTrack API Node.js module

## Getting Started and Documentation

To get started, please visit this [page](https://www.hypertrack.com/docs/references/#references-helper-libraries-node-js-helper-library).

The documentation for the HyperTrack API and library usage can be found [here](https://www.hypertrack.com/docs/references/#references-apis).

## Contributing

Bug fixes, docs, and library improvements are always welcome. 

#### Getting Started

If you want to familiarize yourself with the project, you can start by [forking the repository](https://help.github.com/articles/fork-a-repo/) and [cloning it in your local development environment](https://help.github.com/articles/cloning-a-repository/). The project requires [Node.js](https://nodejs.org) to be installed on your machine.

After cloning the repository, install the dependencies by running the following command in the directory of your cloned repository:

```bash
npm install
```

You can run the existing tests to see if everything is okay by executing:

```bash
export HT_ACCOUNT_ID={AccountId}
export HT_SECRET_KEY={AccountSecret}
export HT_EXISTING_DEVICE_ID={ExistingDeviceId}

npm test
```
