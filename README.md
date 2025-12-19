Source code for generating retrospection handbooks for the Resin project's 2025 winter school.

# Installation

Install [git](https://git-scm.com/) and [node](https://nodejs.org). Then open a terminal and go to the folder in which you want to install. Then paste the following:

```bash
git clone git@github.com:medialab/resin-uh2025-booklets.git
cd resin-uh2025-booklets
npm install
echo michel > persons.txt
```

Then: 
* edit `persons.txt` by adding the names of your event's participants
* edit `periods.json`, `questions_words_in.txt` and `questions_words_out.txt` to feet your needs

Then, if you have Resin's fonts, create a `fonts` folder in the `output` folder, then add `Edgar` and `GesitMono` fonts folders for the corresponding fonts. If you don't, handbooks will be generated with your browser's default fonts.

# Usage

The `make.js` script generates a handbook for each person's name in `persons.txt` file line, as a `html` file in `output` folder. It also creates a `tout.html` file with all the handbooks.

To generate the files run the following command in the terminal :

```bash
node make.js
```

Then to previsualize and export the result :

1. open an terminal in the `output` folder
2. use a static server spawner like [`live-server`](https://pypi.org/project/live-server/)
3. browse the page you want to export as pdf or print
4. use the print function of your browser to print or save as pdf