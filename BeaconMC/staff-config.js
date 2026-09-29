/**
 * ============================================================================
 * BeaconMC Official Staff Configuration
 * ============================================================================
 * 
 * To edit staff details, simply update the fields below:
 *   - minecraftIGN : Minecraft in-game username
 *   - discordID    : Discord username or tag (leave as "" to cleanly hide this row)
 *   - avatar       : Avatar image URL (leave as "" to use the clean default placeholder)
 * 
 * Official Roles & Order:
 *   1. Owner
 *   2. Founder
 *   3. Co-Owner
 *   4. Co-Founder
 *   5. Admin
 *   6. Mod
 *   7. Staff
 *   8. Builder
 *   9. Helper
 * ============================================================================
 */

const staffMembers = [
  {
    role: "Owner",
    minecraftIGN: "BeaconX7",
    discordID: "beaconmc",
    avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554024043433164850/avatar-3d-bust.png?ex=6abcb2ac&is=6abb612c&hm=129ced6344f3636257e72d73a4a55e59b54892d315ca7a7a852423d27a5cdfa5&"
  },
  {
    role: "Founder",
    minecraftIGN: "AshuX7",
    discordID: "ashugautam0849",
    avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554025193637154856/avatar-3d-bust_1.png?ex=6abcb3be&is=6abb623e&hm=0b0b4f4c4f60a301b481eaf602bfde2b6d05029c9686d7eeb30ed3974c69a6e3&"
  },
  {
    role: "Co-Owner",
    minecraftIGN: "Arushi_X7",
    discordID: "pro_mahiru",
    avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554480144029188226/avatar-3d-bust_7.png?ex=6abd09f3&is=6abbb873&hm=770d0150212297bc23c3a3cd0240aae6485fe668a1cfd40096b4bb32ca04f94a&"
  },
  {
    role: "Co-Founder",
    minecraftIGN: "Echo_X1",
    discordID: "echo_x1__58783",
    avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554031930314457148/avatar-3d-bust_3.png?ex=6abcba04&is=6abb6884&hm=70a52036f84728a9a88bf9fb088caf67368182ed5330c859531f54a645d20c56&"
  },
  {
    role: "Admin",
    minecraftIGN: "AuraManav",
    discordID: "manavsoni980",
    avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554482060184256552/avatar-3d-bust_8.png?ex=6abd0bbc&is=6abbba3c&hm=54c28be1c49345d844ab141a6daea531898b58882fc256a107a3041e4391a2e1&"
  },
  {
    role: "Mod",
    minecraftIGN: "RoronoaZORO_18",
    discordID: "togxsaber",
    avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554026146981617694/avatar-3d-bust_2.png?ex=6abcb4a1&is=6abb6321&hm=9a6ab5b47d214175aa75c1747ce209d5df14e402cc69d3263c4e7ef619d3fd40&"
  },
  {
    role: "Staff",
    minecraftIGN: "_ishaaaaaaa",
    discordID: "its_ishaa0979",
    avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554037951418343424/avatar-3d-bust_4.png?ex=6abcbfa0&is=6abb6e20&hm=2e8b926fae57fab1d68e0859e60ed33a59a17311c4099414ba5f2620cdeee4aa&"
  },
  {
    role: "Builder",
    minecraftIGN: "Kunal_V",
    discordID: "kunal03790",
    avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554479378430173234/avatar-3d-bust_5.png?ex=6abd093c&is=6abbb7bc&hm=f8770e707b1e4ca5e77c20cad8010f51089c4be0c0680b4ca5145450e0304ca5&"
  },
  {
    role: "Helper",
    minecraftIGN: "zylosplayzzzzz",
    discordID: "zylosplayzzzzz",
    avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554479443165057085/avatar-3d-bust_6.png?ex=6abd094c&is=6abbb7cc&hm=5baf2aca7b44167e2fc3266b12ae20989bd27e48aff20889f4609c8334183f60&"
  }
];

// Expose on global window object for browser access
if (typeof window !== 'undefined') {
  window.staffMembers = staffMembers;
}

// Support Node.js / module environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = staffMembers;
}
