
export const BOSC_TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint amount) returns (bool)",
  "function transferFrom(address sender, address recipient, uint amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
  "event Approval(address indexed owner, address indexed spender, uint amount)"
];

export const BOOK_OF_SCAMS_ABI = [
  "function addScammer(string memory _name, string memory _accusedOf, string memory _photoUrl) returns (bytes32)",
  "function contributeToBounty(bytes32 _scammerId, uint256 _amount)",
  "function getScammerCount() view returns (uint256)",
  "function getScammerIdAtIndex(uint256 _index) view returns (bytes32)",
  "function getScammerDetails(bytes32 _scammerId) view returns (string memory name, string memory accusedOf, string memory photoUrl, uint256 bountyAmount, address reporter, uint256 dateAdded)",
  "function scammerIds(uint256) view returns (bytes32)",
  "function scammers(bytes32) view returns (string name, string accusedOf, string photoUrl, uint256 bountyAmount, address reporter, uint256 dateAdded, bool exists)",
  "event ScammerAdded(bytes32 indexed scammerId, string name, address reporter, uint256 bountyAmount)",
  "event BountyIncreased(bytes32 indexed scammerId, uint256 amount, uint256 newTotal, address contributor)"
];

// These are example contract addresses - replace with actual deployed contract addresses in production
export const CONTRACT_ADDRESSES = {
  // Ethereum Mainnet
  1: {
    boscToken: "0x1234567890123456789012345678901234567890",
    bookOfScams: "0x0987654321098765432109876543210987654321"
  },
  // Goerli Testnet
  5: {
    boscToken: "0x2345678901234567890123456789012345678901",
    bookOfScams: "0x9876543210987654321098765432109876543210"
  },
  // Sepolia Testnet
  11155111: {
    boscToken: "0x3456789012345678901234567890123456789012",
    bookOfScams: "0x8765432109876543210987654321098765432109"
  },
  // Polygon
  137: {
    boscToken: "0x4567890123456789012345678901234567890123",
    bookOfScams: "0x7654321098765432109876543210987654321098"
  }
};

export const DEVELOPER_WALLET_ADDRESS = "0x80ec8C9A7ac3b601a9628a840306e85a01809074";
