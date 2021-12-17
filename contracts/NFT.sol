// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/utils/Strings.sol";

contract NFT is ERC721, Ownable {
    mapping(uint => bytes32) public getHash;// tokenID => hash
    mapping(bytes32 => bool) existed; // hash => bool
    uint public curId;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

    function mint(bytes32 hash) public {
        require(!existed[hash], "has existed");
        uint id = next_id();
        _safeMint(msg.sender, id);
        inc_id();
        getHash[id] = hash;
    }

    function updateHash(uint id,bytes32 hash) public {
        require(existed[hash], "existed hash");
        require(ownerOf(id) == msg.sender, "only owner");
        getHash[id] = hash;
    }

    function burn(uint id) public {
        require(_exists(id), "invalid id");
        require(ownerOf(id) == msg.sender, "invalid user");
        _burn(id);
        delete getHash[id];
    }

    function transfer(address to, uint id) public {
        require(_exists(id), "invalid id");
        require(ownerOf(id) == msg.sender, "invalid user");
        _safeTransfer(msg.sender, to, id, new bytes(0x0));
    }

    function next_id() internal view returns (uint) {
        return curId + 1;
    }

    function inc_id() internal {
        curId += 1;
    }
}
