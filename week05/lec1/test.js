"use strict"

require("chai").should()

const {main} = require("./package")
const add = require(main)

describe("add", () =>
{
	it("should be a function with 1 param", () =>
	{
		add.should
			.be.a("function")
			.have.lengthOf(1)
	})

	it("should add any number of ints", () =>
	{
		add("1").should.equal(1)
		add("1,2").should.equal(3)
		add("3,6,1").should.equal(10)
		add("4,8,15,16,23,42").should.equal(108)
	})

	it("should return 0 for empty string", () =>
	{
		add("").should.equal(0)
	})

	it("should handle new lines between numbers", () =>
	{
		add("1\n2,3").should.equal(6)
	})

	it("should support different delimiters", () => 
	{
		add("//;\n1;2").should.equal(3)
		add("//-\n7-5").should.equal(12)
	})

	it("should throw an exception “negatives not allowed", () =>
	{
		(()=>{add('4,-8')}).should.throw(Error, 'Negative numbers like -8 are not allowed');

		(()=>{add('4,-8, -9, 20')}).should.throw(Error, 'Negative numbers like -8, -9 are not allowed');

		(()=>{add("//;\n7;-5")}).should.throw(Error, 'Negative numbers like -5 are not allowed');	
	})

	it("should ignore numbers higher then 1000", () => 
	{
		add('4,1002, 9999, 20').should.equal(24)
		add('999999999999,0, 9999, 20, 3').should.equal(23)
	})

	it("should support any length of delimiters", () => 
	{
		add("//;;;\n1;;;2").should.equal(3)
		add("//---\n7---5").should.equal(12)
	})

	it("should support multiple delimiters", () => 
	{
		add("//[*][%]\n1*2%3").should.equal(6)
		add("//[*][%][=]\n1*2%3=4").should.equal(10)
	})

	it("should support multiple delimiters with more then 1 char", () => 
	{
		add("//[*=*][%,]\n1*=*2%,3").should.equal(6)
	})

})