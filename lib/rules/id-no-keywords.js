'use strict';

// Rule that warns when identifier names are keywords.

const toLut = str =>
  str.trim().split(/\s+/).reduce((res, e) => {
    res[e] = true;
    return res;
  }, {});

const keywords = {
  '1364-1995': toLut(`
    always        ifnone        rpmos
    and           initial       rtran
    assign        inout         rtranif0
    begin         input         rtranif1
    buf           integer       scalared
    bufif0        join          small
    bufif1        large         specify
    case          macromodule   specparam
    casex         medium        strong0
    casez         module        strong1
    cmos          nand          supply0
    deassign      negedge       supply1
    default       nmos          table
    defparam      nor           task
    disable       not           time
    edge          notif0        tran
    else          notif1        tranif0
    end           or            tranif1
    endcase       output        tri
    endfunction   parameter     tri0
    endmodule     pmos          tri1
    endprimitive  posedge       triand
    endspecify    primitive     trior
    endtable      pull0         trireg
    endtask       pull1         vectored
    event         pulldown      wait
    for           pullup        wand
    force         rcmos         weak0
    forever       real          weak1
    fork          realtime      while
    function      reg           wire
    highz0        release       wor
    highz1        repeat        xnor
    if            rnmos         xor
  `),
  '1364-2001': toLut(`
    automatic     incdir        pulsestyle_onevent
    cell          include       showcancelled
    config        instance      signed
    design        liblist       unsigned
    endconfig     library       use
    endgenerate   localparam
    generate      noshowcancelled
    genvar        pulsestyle_ondetect
  `),
  '1364-2001-noconfig' : toLut(`
    cell
    config
    design
    endconfig
    incdir
    include
    instance
    liblist
    library
    use
  `),
  '1364-2005': toLut('uwire'),
  '1800-2005': toLut(`
    alias         endsequence   pure
    always_comb   enum          rand
    always_ff     expect        randc
    always_latch  export        randcase
    assert        extends       randsequence
    assume        extern        ref
    before        final         return
    bind          first_match   sequence
    bins          foreach       shortint
    binsof        forkjoin      shortreal
    bit           iff           solve
    break         ignore_bins   static
    byte          illegal_bins  string
    chandle       import        struct
    class         inside        super
    clocking      int           tagged
    const         interface     this
    constraint    intersect     throughout
    context       join_any      timeprecision
    continue      join_none     timeunit
    cover         local         type
    covergroup    logic         typedef
    coverpoint    longint       union
    cross         matches       unique
    dist          modport       var
    do            new           virtual
    endclass      null          void
    endclocking   package       wait_order
    endgroup      packed        wildcard
    endinterface  priority      with
    endpackage    program       within
    endprogram    property
    endproperty   protected
  `),
  '1800-2009': toLut(`
    accept_on     reject_on     sync_accept_on
    checker       restrict      sync_reject_on
    endchecker    s_always      unique0
    eventually    s_eventually  until
    global        s_nexttime    until_with
    implies       s_until       untyped
    let           s_until_with  weak
    nexttime      strong
  `),
  '1800-2012': toLut(`
    implements    nettype
    interconnect  soft
  `),
  '1800-2017': {}
};

module.exports = {
  meta: {},
  checker: messenger => ({
    enter: node => {
      if (node.type === 'simple_identifier') {
        Object.keys(keywords).some(ver => {
          if (keywords[ver][node.text]) {
            messenger(node, 'error', 'illegal identifier: "' + (node.text) + '" is reserved keyword in IEEE ' + ver);
            return true;
          }
        });
      }
    }
  })
};
