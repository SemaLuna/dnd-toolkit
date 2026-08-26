TODO list for Dev:

- Enable ssh-agent - https://code.visualstudio.com/remote/advancedcontainers/sharing-git-credentials#_using-ssh-keys (it seems to just work when you do it once, then reopen the container from the code inside WSL without touching Windows)
  - Make sure to run ssh-agent -s &> $HOME/.ssh/ssh-agent manually - then verify ssh-add -l includes the credentials
  - Verify you can git fetch
- Install ember inspector for firefox: https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/ - then make sure on the extension settings that it includes 'Access Data from all Sites'
  - Verify you can see ember inspector running on the browser

# Technical Overview

- The website is hosted on Github - as static files.
- The website will include SRD data that is available to the public (a subset? All?)
- The website will accept importing / exporting of its own data, to support for users maintaining custom content
- The website will store the information using OPFS - so we don't need to worry about licensing issues when users import licensed information or their own modifications.
- The SRD data will be available as JSON resources, loaded to OPFS if needed (and potentially by parts?), keeping the overall site quick and snappy.

The goal is to make the website useful for players to review their own spells, add their own annotations, filtering capabilities, and so on.

# TODOs

- Create a script, and commit it, that can quickly transform the SRD API from https://www.dnd5eapi.co/api/2014/spells/fireball into json-api compliant formats (start with something easy, like all cantrips)
  - snake-case names as IDs, camelCase all fields
- Expand on the OPFS behaviour, add tests
- Use Canvas (or something else?) to draw the Grid / Spell Shapes.
- Create a table of spells that are stored in the website
