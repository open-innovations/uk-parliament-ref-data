#!/usr/bin/env deno run --allow-net --allow-write

import { writeCSV } from 'https://deno.land/x/flat@0.0.15/mod.ts';

async function callMembersApi(skip = 0) {
  const url = new URL('/api/Members/Search', 'https://members-api.parliament.uk');
  url.searchParams.set('skip', skip);
  url.searchParams.set('take', 20);
  url.searchParams.set('House', 1);
  url.searchParams.set('IsCurrentMember', 'true');

  console.log(url.toString());

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json(); // For JSON Response

  const summary = result.items.map(member => ({
    member_id: member.value.id,
    member_name: member.value.nameDisplayAs,
    pcon_id: member.value.latestHouseMembership.membershipFromId,
    pcon_name: member.value.latestHouseMembership.membershipFrom,
    party_short_name: member.value.latestParty.abbreviation,
    party_name: member.value.latestParty.name,
  }));

  const next = new URL(result.links.find(x => x.rel === 'page.next').href, url).searchParams.get('skip');
  if (next !== skip) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    summary.push(...(await callMembersApi(next)));
  }

  return summary;
}

const getMembers = async () => {
  let base = '/Members/Search?skip=0&take=20';
  const summary = await callMembersApi(base);
  return summary;
}

const members = await getMembers();

writeCSV('data/members.csv', members);