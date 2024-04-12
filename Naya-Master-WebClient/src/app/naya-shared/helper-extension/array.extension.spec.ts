// @ts-nocheck
// Writted to test the order by functionality extended in ./array.extension.ts file.
// Currently, we don't have any testing tool here, but later when testing is enabled, this test will be used.

describe("orderBy", () => {
  let seedData: any[];

  beforeEach(() => {
    seedData = [
      { "user": "barney", "age": 36, "active": true },
      { "user": "scott", "age": 40, "active": true },
      { "user": "fred", "age": 40, "active": false },
      { "user": "travis", "age": 37, "active": true },
    ];
  });

  it("should return an empty array when called on an empty array", () => {
    const emptyArray: any[] = [];
    const sortedArray = emptyArray.orderBy("age", "user");
    expect(sortedArray).toEqual([]);
  });

  it("should return the same array when called without any sort keys", () => {
    const sortedArray = seedData.orderBy();
    expect(sortedArray).toEqual(seedData);
  });

  it("should handle null or undefined values for the sort keys", () => {
    const dataWithNullValue = [...seedData, { "user": "amy", "age": null, "active": true }];
    const dataWithUndefinedValue = [...seedData, { "user": "john", "age": undefined, "active": true }];

    const sortedArray1 = dataWithNullValue.orderBy("age", "user");
    const sortedArray2 = dataWithUndefinedValue.orderBy("age", "user");

    expect(sortedArray1).toEqual([
      { user: 'barney', age: 36, active: true },
      { user: 'travis', age: 37, active: true },
      { user: 'fred', age: 40, active: false },
      { user: 'scott', age: 40, active: true },
      { user: 'amy', age: null, active: true }
    ]);
    
    expect(sortedArray2).toEqual([
      { user: 'barney', age: 36, active: true },
      { user: 'travis', age: 37, active: true },
      { user: 'fred', age: 40, active: false },
      { user: 'scott', age: 40, active: true },
      { user: 'john', age: undefined, active: true }
    ]);
  });

  it("should handle objects with missing sort keys", () => {
    const dataWithMissingKey = [...seedData, { "user": "zoe", "active": true }];

    const sortedArray = dataWithMissingKey.orderBy("age", "user");

    expect(sortedArray).toEqual([
      { user: 'barney', age: 36, active: true },
      { user: 'travis', age: 37, active: true },
      { user: 'fred', age: 40, active: false },
      { user: 'scott', age: 40, active: true },
      { user: 'zoe', active: true }
    ]);
  });
});
