#!/usr/bin/env python
import os

import pandas as pd
from thefuzz import process


def main():
    os.chdir('data')

    parl = pd.read_csv('members.csv')
    ons = pd.read_csv(
        'https://geoportal1-ons.opendata.arcgis.com/datasets/4c191bee309d4b2d8b2c5b94d2512af9_0.csv')
    mplookup = pd.read_csv('mplookup.tsv', sep='\t', encoding='latin')

    ons['merge_key'] = ons.pcon19nm.apply(
        lambda x: process.extractOne(x, parl.pcon_name)[0])

    merged = pd.merge(left=parl, right=ons, how='left',
                      left_on='pcon_name', right_on='merge_key')
    merged = pd.merge(left=merged, right=mplookup, how='left',
                      left_on='pcon19cd', right_on='Constituency ID')[[
                        'member_name',
                        'member_id',
                        'TheyWorkForYou MP ID',
                        'party_short_name',
                        'party_name',
                        'pcon19cd',
                        'pcon19nm',
                        'pcon_id'
                      ]].rename(
                        columns = {
                          'member_id':'ukparliament_member_id',
                          'pcon_id': 'ukparliament_pcon_id',
                          'TheyWorkForYou MP ID':'they_work_for_you_mp_id'
                        }
                      )

    merged.to_csv('members_augmented.csv', index=False)
    return


if __name__ == '__main__':
    main()
