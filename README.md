# UK Parliamentary Reference Data

## Members of Parliament

The `get_members.js` script downloads a list of the latest MPs from the `https://members-api.parliament.uk`
API into `data/members.csv`. This will need Deno or a node runtime to operate.

This file contains the following fields:

* `member_id` ID of the Member of Parliamemt
* `member_name` Name of the Member of Parliament
* `pcon_id` ID for the Parliamentary Constituency
* `pcon_name` Name of the Parliamentary Constituency
* `party_short_name` Abbreviated Party Name
* `party_name` Party Name

NB the IDs are not ONS IDs, but referenced to the parliament.uk site.

Once this file has been downloaded, the `match_data.py` script will merge some additional reference data in,
including ONS codes for constituencies and They Work For You IDs. These are stored in the
`data/members_augmented.csv` file.

This contains the following fields:

* `member_name` Name of the Member of Parliament
* `ukparliament_member_id` ID of the Member of Parliamemt (UK Parliament ID)
* `they_work_for_you_mp_id` ID of the Member of Parliamemt (They Work For You ID)
* `party_short_name` Abbreviated Party Name (as reported by UK Parliament API)
* `party_name` Party Name (as reported by UK Parliament API)
* `pcon19cd` ONS Parlimentary Constituency Code
* `pcon19nm` ONS Parlimentary Constituency Name
* `ukparliament_pcon_id` ID for the Parliamentary Constituency (UK Parliament ID)
