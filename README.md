# ZMA Facility Engineering

### Overview

This repository contains the master copies of important ZMA Facility Engineering documents and data that need to be versioned and released in a controlled manner. 

The purpose of this repository is to be:
* a master copy of the files.
* an immutable archive and backup for disaster recovery purposes 
* a version management system for tracking difference between file versions
* a release management system to identify which versions of the documents are released, and when
* an issue tracking system that allows others to record facility issues that need attention
* a centralized collaboration tool that allows multiple contributors to particpate simultaneously without losing work

### Repository Structure

The repository structure is structured as follows:

- archive/ *do not edit; files as they existed upon conversion to a git repo on 2019.04.27*</li>
- docs/ *active docs used to manage the facility, including a reconstituted file history*


### AIRAC Cycles and File Release Dates

Files are released on cadence following alternating international AIRAC cycle. The release occurs on the second Sunday following the AIRAC date.

| AIRAC| Eff. Date |  Release  |
|------|-----------|-----------|
| 2201 | 27 JAN 22 | 06 FEB 22 |
| 2202 | 24 FEB 22 | ---N/A--- |
| 2203 | 24 MAR 22 | 03 APR 22 |
| 2204 | 21 APR 22 | ---N/A--- |
| 2205 | 19 MAY 22 | 29 MAY 22 |
| 2206 | 16 JUN 22 | ---N/A--- |
| 2207 | 14 JUL 22 | 24 JUL 22 |
| 2208 | 11 AUG 22 | ---N/A--- |
| 2209 | 08 SEP 22 | 18 SEP 22 |
| 2210 | 06 OCT 22 | ---N/A--- |
| 2211 | 03 NOV 22 | 13 NOV 22 |
| 2212 | 01 DEC 22 | ---N/A--- |
| 2213 | 29 DEC 22 | 08 JAN 23 |

## Automation

This repository contains some scripting to speed up various repetetive processes. To use these scripts, please complete the setup outlined below first:

1. Install [nodeJS](https://nodejs.org/en/download/) (required to run the scripts).
1. Confirm successful installation with `node -v` and `npm -v`.
    - Each command will show the version if installed correctly.
1. Run `npm install`. This only needs to be done once to install required dependencies.

### Using Automated POF Generation

1. Make any desired edits to `pofSource.json`, simply following the patterns you see.
1. On a command line, run `node devops/generatePofFiles.js`

Output files will be located in `docs/pof/generated`.

These will include customized POFs for individual TRACONs without the host facility's prefix. These are used in vSTARS facility files so Miami Approach sector N can hand off to Miami Approach sector V by typing "V", rather than "MV".

## Contact

For questions about this repository, contact the ZMA Facility Engineer at fe@zmaartcc.net.
