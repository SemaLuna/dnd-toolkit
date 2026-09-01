# Technical Overview

- The website is hosted on Github - as static files.
- The website will include SRD data that is available to the public (a subset? All?)
- The website will accept importing / exporting of its own data, to support for users maintaining custom content
- The website will store the information using OPFS - so we don't need to worry about licensing issues when users import licensed information or their own modifications.
- The SRD data will be available as JSON resources, loaded to OPFS if needed (and potentially by parts?), keeping the overall site quick and snappy.

The goal is to make the website useful for players to review their own spells, add their own annotations, filtering capabilities, and so on.

# TODOs

- Expand on the OPFS behaviour, add tests
- Use Canvas (or something else?) to draw the Grid / Spell Shapes.
- Create a table of spells that are stored in the website

# Where does the D&D 5E data come from?

We are using the SRD data, which is free and open for use.

More specifically, we are using the API provided [here](https://www.dnd5eapi.co/) to quickly populate our static JSON files.

## Licensing

This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC and available at https://www.dndbeyond.com/srd

The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode.
