# UK Parliamentary Reference Data

## Members of Parliament

The `get_members.js` script downloads a list of the latest MPs from the `https://members-api.parliament.uk`
API into `data/members.csv`.

This file contains the following fields:

* `id` ID of the Member of Parliamemt
* `name` Name of the Member of Parliament
* `pcon` Name of the Parliamentary Constituency
* `pconId` ID for the Parliamentary Constituency

NB the IDs are not ONS IDs, but referenced to the parliament.uk site.

