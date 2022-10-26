Glaemscribe.resource_manager.raw_modes["quenya"] = "\\**\n\nGlǽmscribe (also written Glaemscribe) is a software dedicated to\nthe transcription of texts between writing systems, and more\nspecifically dedicated to the transcription of J.R.R. Tolkien\'s\ninvented languages to some of his devised writing systems.\n\nCopyright (C) 2015 Benjamin Babut (Talagan).\n\nThis program is free software: you can redistribute it and/or modify\nit under the terms of the GNU Affero General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\nany later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU Affero General Public License for more details.\n\nYou should have received a copy of the GNU Affero General Public License\nalong with this program.  If not, see <http://www.gnu.org/licenses/>.\n\n**\\\n\n\\beg changelog\n  \\entry \"0.0.2\", \"added χ for the word χarina, correcting ts/ps sequences to work better with eldamar\"\n  \\entry \"0.0.3\", \"added o/u curl option\"\n  \\entry \"0.0.4\", \"added voiced plosives corner cases treatment and option to chose method\"\n  \\entry \"0.0.5\", \"fixing h+long vowel medially\"\n  \\entry \"0.0.6\", \"adding option for alveolarized consonants  st (t+t), pt (p+t), ht (c+t)\"\n  \\entry \"0.0.7\", \"Fixing rb/lb, to be treated as r+mb and l+mb\"\n  \\entry \"0.0.8\", \"Correcting double dot version for ry (aesthetics)\"\n  \\entry \"0.0.9\", \"Adding \'implicit a\' option.\"\n  \\entry \"0.1.0\", \"Simplified diacritic use by using new post-processor directive\"\n  \\entry \"0.1.1\", \"Added default option for voiced plosives : use mb, nd, ng, ngw\"\n  \\entry \"0.1.2\", \"Added a tehta shape selection\"\n  \\entry \"0.1.3\", \"Fixing ks, ps, ts. Fixing dot under ore, romen in implicit a mode.\"\n  \\entry \"0.1.4\", \"Conforming to the new csub format. Cleaning with new csub classes.\"\n  \\entry \"0.1.5\", \"csub removed. Now using virtual chars defined in charsets.\"\n  \\entry \"0.1.6\", \"Removing unutixe under óre for coherency in implicit a submode.\"\n\\end\n\n\\**\n  TODO : Option for dot or not in \'a implicit\' option before long vowels ?\n  TODO : bb, dd etc ? (for noobs)\n**\\\n\n\\language \"Quenya\"\n\\writing  \"Tengwar\"\n\\mode     \"Classical\"\n\\version  \"0.1.6\"\n\\authors  \"Talagan (Benjamin Babut)\"\n\n\\charset  tengwar_ds         true\n\\charset  tengwar_ds_eldamar false\n\n\\beg      options\n  \\option implicit_a false\n  \\beg option a_tetha_shape A_SHAPE_THREE_DOTS\n    \\value A_SHAPE_THREE_DOTS 1\n    \\value A_SHAPE_CIRCUMFLEX 2\n  \\end\n  \\beg option reverse_o_u_tehtar U_UP_O_DOWN\n    \\value O_UP_U_DOWN 1\n    \\value U_UP_O_DOWN 2\n  \\end\n  \\option split_diphthongs false\n  \\option always_use_romen_for_r false\n  \\beg option voiced_plosives_treatment VOICED_PLOSIVES_AS_NASALIZED\n    \\value VOICED_PLOSIVES_AS_NASALIZED 0\n    \\value VOICED_PLOSIVES_WITH_STROKE 1\n    \\value VOICED_PLOSIVES_WITH_XTD 2\n  \\end\n  \\beg option st_pt_ht ST_PT_HT_SEPARATED\n    \\value ST_PT_HT_SEPARATED 1\n    \\value ST_PT_HT_WITH_XTD 2\n  \\end\n  \\option reverse_numbers true\n  \\beg option numbers_base BASE_12\n    \\value    BASE_10 10\n    \\value    BASE_12 12\n  \\end\n\\end\n\n\\beg      preprocessor\n  \\** Work exclusively downcase **\\\n  \\downcase\n\n  \\** Simplify trema vowels **\\\n  \\substitute ä a\n  \\substitute ë e\n  \\substitute ï i\n  \\substitute ö o\n  \\substitute ü u\n  \\substitute ÿ y\n\n  \\** Dis-ambiguate long vowels **\\\n  \\rxsubstitute \"(ā|â|aa)\" \"á\"\n  \\rxsubstitute \"(ē|ê|ee)\" \"é\"\n  \\rxsubstitute \"(ī|î|ii)\" \"í\"\n  \\rxsubstitute \"(ō|ô|oo)\" \"ó\"\n  \\rxsubstitute \"(ū|û|uu)\" \"ú\"\n  \\rxsubstitute \"(ȳ|ŷ|yy)\" \"ý\"\n\n  \\substitute   \"qu\" \"q\" \\** Dis-ambiguate qu **\\\n\n  \\elvish_numbers \"\\\\eval numbers_base\" \"\\\\eval reverse_numbers\"\n\\end\n\n\n\\beg processor\n\n  \\beg    rules litteral\n\n    {K}                 ===  (c,k)\n    {SS}                ===  (z,ss)\n\n    {VOWELS}            === a               *  e              * i              * o              *  u\n    {LVOWELS}           === á               *  é              * í              * ó              *  ú\n\n    \\if \"reverse_o_u_tehtar == U_UP_O_DOWN\"\n      {O_LOOP} === O_TEHTA\n      {U_LOOP} === U_TEHTA\n    \\else\n      {O_LOOP} === U_TEHTA\n      {U_LOOP} === O_TEHTA\n    \\endif\n\n    \\if \"a_tetha_shape == A_SHAPE_THREE_DOTS\"\n      {A_SHAPE} === A_TEHTA\n    \\else\n      {A_SHAPE} === A_TEHTA_CIRCUM\n    \\endif\n\n    \\if implicit_a\n      {_A_}              === {NULL}\n      {_NVOWEL_}         === NO_VOWEL_DOT\n    \\else\n      {_A_}              === {A_SHAPE}\n      {_NVOWEL_}         === {NULL}\n    \\endif\n\n    {_TEHTAR_}          === {_A_}      *  E_TEHTA     *  I_TEHTA    * {O_LOOP}    *  {U_LOOP}\n\n    \\if split_diphthongs\n      {WDIPHTHONGS}     === {NULL}\n      {_WDIPHTHONGS_}   === {NULL}\n    \\else\n      {DIPHTHONGS}      === ai            * au            * eu            * iu             * oi               * ui\n      {_DIPHTHONGS_}    === YANTA {_A_}   * URE {_A_}     * URE E_TEHTA   * URE I_TEHTA    * YANTA {O_LOOP}   * YANTA {U_LOOP}\n      {WDIPHTHONGS}     === * {DIPHTHONGS}   \\** groovy! **\\\n      {_WDIPHTHONGS_}   === * {_DIPHTHONGS_} \\** same thing **\\\n    \\endif\n\n    \\if implicit_a\n      \\** consonants will take a tehta for a, and have ara + tehta in other cases **\\\n      \n      \\** Bertrand does like the dot before long vowels **\\\n      \\** {_LTEHTAR_}     === {A_SHAPE} * {_NVOWEL_} ARA E_TEHTA * {_NVOWEL_} ARA I_TEHTA * {_NVOWEL_} ARA {O_LOOP} * {_NVOWEL_} ARA {U_LOOP} **\\\n      \n      {_LTEHTAR_}         === {A_SHAPE} * ARA E_TEHTA * ARA I_TEHTA * ARA {O_LOOP} * ARA {U_LOOP}\n      {_WLONG_}           === * {_LTEHTAR_}\n      {WLONG}             === * {LVOWELS}\n    \\else\n      {_LTEHTAR_}         === ARA {A_SHAPE} * ARA E_TEHTA * ARA I_TEHTA * ARA {O_LOOP} * ARA {U_LOOP}\n      {_WLONG_}           === {NULL}\n      {WLONG}             === {NULL}\n    \\endif\n\n    {V_D}           === [ {VOWELS} {WLONG} {WDIPHTHONGS} ]\n    {V_D_WN}        === [ {VOWELS} {WLONG} {WDIPHTHONGS} * {NULL} ]\n\n    {_V_D_}         === [ {_TEHTAR_} {_WLONG_} {_WDIPHTHONGS_} ]\n    {_V_D_WN_}      === [ {_TEHTAR_} {_WLONG_} {_WDIPHTHONGS_} * {_NVOWEL_} ]\n\n    \\** VOWEL RULES **\\\n    [{VOWELS}]    --> TELCO [{_TEHTAR_}]  \\** Replace isolated short vowels **\\\n    \\if implicit_a\n      [{LVOWELS}] --> TELCO {A_SHAPE}  * ARA E_TEHTA * ARA I_TEHTA * ARA {O_LOOP} * ARA {U_LOOP}\n    \\else\n      [{LVOWELS}] --> [{_LTEHTAR_}]       \\** Replace long vowels **\\\n    \\endif\n\n    \\if !split_diphthongs\n      [{DIPHTHONGS}]    -->   [{_DIPHTHONGS_}]     \\**  Replace diphthongs **\\\n    \\endif\n\n    \\** ===================== **\\\n    \\**     1ST LINE RULES    **\\\n    \\** ===================== **\\\n    {L1}          === t     * p       * {K}   * q\n    {_L1_}        === TINCO * PARMA   * CALMA * QUESSE\n\n    \\** GEMINATED **\\\n    {L1_1_GEMS}   === tt                  * pp                    * {K}{K}\n    {_L1_1_GEMS_} === TINCO GEMINATE_SIGN * PARMA GEMINATE_SIGN   * CALMA GEMINATE_SIGN\n\n    \\** NORMAL **\\\n    [ {L1} * {L1_1_GEMS} ] {V_D_WN} --> [ {_L1_} * {_L1_1_GEMS_} ] {_V_D_WN_}\n\n    \\** OTHERS **\\\n    ty{V_D_WN}          --> TINCO PALATAL_SIGN {_V_D_WN_}\n    py{V_D_WN}          --> PARMA PALATAL_SIGN {_V_D_WN_}\n\n    ts{V_D_WN}          --> TINCO {_V_D_WN_} ALVEOLAR_SIGN\n    ps{V_D_WN}          --> PARMA {_V_D_WN_} ALVEOLAR_SIGN\n    {K}s{V_D_WN}        --> CALMA ALVEOLAR_SIGN {_V_D_WN_}   \n    x{V_D_WN}           --> CALMA ALVEOLAR_SIGN {_V_D_WN_}   \\** render ks for x **\\\n\n    \\** ===================== **\\\n    \\**     2ND LINE RULES    **\\\n    \\** ===================== **\\\n    {L2}          === nd      * mb        * ng      * ngw\n    {_L2_}        === ANDO    * UMBAR     * ANGA    * UNGWE\n\n    \\** STANDARD **\\\n    [{L2}]{V_D_WN}  --> [{_L2_}]{_V_D_WN_}\n\n    \\** Palatalized **\\\n    ndy{V_D_WN} --> ANDO PALATAL_SIGN {_V_D_WN_}\n\n    \\** Have some rules for d,b,g,gw although there are not theoritically possible, aldudénie e.g needs it **\\\n    {L2_UN}               === d       * b         * g       * gw\n\n    \\if \"voiced_plosives_treatment == VOICED_PLOSIVES_AS_NASALIZED\"\n      [{L2_UN}]{V_D_WN}   --> [{_L2_}] {_V_D_WN_}\n    \\elsif \"voiced_plosives_treatment == VOICED_PLOSIVES_WITH_STROKE\"\n      [{L2_UN}]{V_D_WN}   --> [{_L2_}] THINF_STROKE_XL {_V_D_WN_}\n    \\else\n      {_L2_UN_}            === TW_EXT_21 * TW_EXT_22 * TW_EXT_23 * TW_EXT_24\n      [{L2_UN}]{V_D_WN}    --> [{_L2_UN_}] {_V_D_WN_}\n    \\endif\n\n    \\if \"st_pt_ht == ST_PT_HT_WITH_XTD\"\n      {L2_ALVEOLARIZED}     === st        * pt        * ht\n      {_L2_ALVEOLARIZED_}   === TW_EXT_11 * TW_EXT_12 * TW_EXT_13\n\n      [{L2_ALVEOLARIZED}]{V_D_WN}  --> [{_L2_ALVEOLARIZED_}] {_V_D_WN_}\n    \\endif\n\n    \\** ===================== **\\\n    \\**     3RD LINE RULES    **\\\n    \\** ===================== **\\\n    {L3}      === (th,þ) * f       * (h,χ)  * hw\n    {_L3_}    === SULE   * FORMEN  * AHA    * HWESTA\n\n    \\** NORMAL **\\\n    [{L3}]{V_D_WN}  --> [{_L3_}]{_V_D_WN_}\n\n    \\** OTHERS **\\\n    hy{V_D_WN}      --> HYARMEN PALATAL_SIGN {_V_D_WN_}\n\n    \\** Override h with vowels (descendent of hy) **\\\n    _h{V_D}         --> HYARMEN {_V_D_}\n    _h[{LVOWELS}]   --> HYARMEN [{_LTEHTAR_}]\n\n    (h,χ)           --> AHA\n\n    \\** ===================== **\\\n    \\**     4TH LINE RULES    **\\\n    \\** ===================== **\\\n    {L4}   === nt    * mp    * nc    * nq      \\** Not nqu, due to preprocessor **\\\n    {_L4_} === ANTO  * AMPA  * ANCA  * UNQUE\n\n    \\** NORMAL **\\\n    [{L4}]{V_D_WN}    --> [{_L4_}]{_V_D_WN_}\n    \\** OTHERS **\\\n    nty{V_D_WN}       --> ANTO PALATAL_SIGN {_V_D_WN_}\n\n    \\** ===================== **\\\n    \\**     5TH LINE RULES    **\\\n    \\** ===================== **\\\n    {L5}   === n     * m     * ñ     * ñw      * _nw\n    {_L5_} === NUMEN * MALTA * NOLDO * NWALME  * NWALME\n\n    [{L5}]{V_D_WN}  --> [{_L5_}]{_V_D_WN_}\n\n    ny{V_D_WN}          --> NUMEN PALATAL_SIGN {_V_D_WN_}\n    nn{V_D_WN}          --> NUMEN GEMINATE_SIGN   {_V_D_WN_}\n    my{V_D_WN}          --> MALTA PALATAL_SIGN {_V_D_WN_}\n    mm{V_D_WN}          --> MALTA GEMINATE_SIGN   {_V_D_WN_}\n\n    \\** ===================== **\\\n    \\**     6TH LINE RULES    **\\\n    \\** ===================== **\\\n\n    {_LONE_R_} === ORE \\** TODO: Add dot for full unutixe, don\'t add dot for lazy unutixe **\\\n    \\if always_use_romen_for_r\n      \\** Override lone r if option is on **\\\n      {_LONE_R_} === ROMEN {_NVOWEL_} \n    \\endif\n\n    {L6}        === r     * v     * y                   * w\n    {_L6_}      === ROMEN * VALA  * ANNA PALATAL_SIGN   * VILYA\n\n    [{L6}]{V_D_WN} --> [{_L6_}]{_V_D_WN_}\n\n    \\** r before long vowels is voiced **\\\n    r[{LVOWELS}]      --> ROMEN [{_LTEHTAR_}]\n\n    \\** Override rule r + null **\\\n    r                 --> {_LONE_R_}\n\n    rr{V_D_WN}        --> ROMEN GEMINATE_SIGN {_V_D_WN_}\n    ry{V_D_WN}        --> ROMEN PALATAL_SIGN {_V_D_WN_}\n    rd{V_D_WN}        --> ARDA {_V_D_WN_}\n\n    \\** ===================== **\\\n    \\**     L  LINE RULES     **\\\n    \\** ===================== **\\\n    {LINE_L}          === l     * ld      * ll\n    {_LINE_L_}        === LAMBE * ALDA    * LAMBE LAMBE_MARK_TILD\n\n    [{LINE_L}]{V_D_WN}    --> [{_LINE_L_}]{_V_D_WN_}\n\n    ly{V_D_WN}            --> LAMBE PALATAL_SIGN {_V_D_WN_}\n    hl{V_D_WN}            --> HALLA LAMBE {_V_D_WN_}\n    hr{V_D_WN}            --> HALLA ROMEN {_V_D_WN_}\n\n    \\** ===================== **\\\n    \\**   S/Z LINE RULES      **\\\n    \\** ===================== **\\\n    {L8}        === s               * {SS}\n    {_L8_}      === SILME_NUQUERNA  * ESSE_NUQUERNA\n\n    [{L8}]{V_D_WN} --> [{_L8_}]{_V_D_WN_}\n\n    \\** Override lonely s / ss / before consonant **\\\n    s               --> SILME\n    s[{LVOWELS}]    --> SILME [{_LTEHTAR_}]\n    {SS}            --> ESSE\n    {SS}[{LVOWELS}] --> ESSE [{_LTEHTAR_}]\n\n    \\if implicit_a\n      sá            --> SILME_NUQUERNA {A_SHAPE}\n      {SS}á         --> ESSE_NUQUERNA {A_SHAPE}\n    \\endif\n\n  \\end\n\n  \\beg    rules punctuation\n    . --> PUNCT_DDOT\n    .. --> PUNCT_DOT PUNCT_DDOT PUNCT_DOT\n    …  --> PUNCT_TILD\n    ... --> PUNCT_TILD\n    .... --> PUNCT_TILD\n    ..... --> PUNCT_TILD\n    ...... --> PUNCT_TILD\n    ....... --> PUNCT_TILD\n\n    , --> PUNCT_DOT\n    : --> PUNCT_DOT\n    ; --> PUNCT_DOT\n    ! --> PUNCT_EXCLAM\n    ? --> PUNCT_INTERR\n    · --> PUNCT_DOT\n\n    \\** Apostrophe **\\\n\n    \' --> {NULL}\n    ’ --> {NULL}\n\n    \\** Quotes **\\\n\n    “ --> DQUOT_OPEN\n    ” --> DQUOT_CLOSE\n    « --> DQUOT_OPEN\n    » --> DQUOT_CLOSE\n\n    - --> {NULL}\n    – --> PUNCT_TILD\n    — --> PUNCT_TILD\n\n    [ --> PUNCT_PAREN_L\n    ] --> PUNCT_PAREN_R\n    ( --> PUNCT_PAREN_L\n    ) --> PUNCT_PAREN_R\n    { --> PUNCT_PAREN_L\n    } --> PUNCT_PAREN_R\n    < --> PUNCT_PAREN_L\n    > --> PUNCT_PAREN_R\n\n    \\** Not universal between fonts ... **\\\n    $ --> BOOKMARK_SIGN\n    ≤ --> RING_MARK_L \\** Ring inscription left beautiful stuff **\\\n    ≥ --> RING_MARK_R \\** Ring inscription right beautiful stuff **\\\n\n  \\end\n\n  \\beg    rules  numbers\n    0 --> NUM_0\n    1 --> NUM_1\n    2 --> NUM_2\n    3 --> NUM_3\n    4 --> NUM_4\n    5 --> NUM_5\n    6 --> NUM_6\n    7 --> NUM_7\n    8 --> NUM_8\n    9 --> NUM_9\n    A --> NUM_10\n    B --> NUM_11\n  \\end\n\n\\end\n\n\\beg postprocessor\n  \\resolve_virtuals\n\\end\n\n"