const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('capitalizeWords', () => {
  it('capitalizes the first letter of each word', () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
  });

  it('handles empty string', () => {
    expect(capitalizeWords("")).toBe("");
  });

  it('capitalizes a single word', () => {
    expect(capitalizeWords("javascript")).toBe("Javascript");
  });

  it('handles multiple spaces between words', () => {
    expect(capitalizeWords("hello   world")).toBe("Hello   World");
  });

  it('does not change already capitalized letters', () => {
    expect(capitalizeWords("Hello World")).toBe("Hello World");
  });

  it('handles strings with numbers and symbols', () => {
    expect(capitalizeWords("hello world 123!")).toBe("Hello World 123!");
  });
});

describe('filterActiveUsers', () => {
  it('returns only active users', () => {
    const users = [
      { name: "Jeanne", isActive: true },
      { name: "Whitney", isActive: false }
    ];
    expect(filterActiveUsers(users)).toEqual([{ name: "Jeanne", isActive: true }]);
  });

  it('returns empty array if no users', () => {
    expect(filterActiveUsers([])).toEqual([]);
  });

  it('returns empty array if no active users', () => {
    const users = [
      { name: "Whitney", isActive: false },
      { name: "Chariey", isActive: false },
      { name: "Ivanne", isActive: false }
    ];
    expect(filterActiveUsers(users)).toEqual([]);
  });

  it('returns all users if all are active', () => {
    const users = [
      { name: "Jeanne", isActive: true },
      { name: "Charlie", isActive: true }
    ];
    expect(filterActiveUsers(users)).toEqual(users);
  });

  it('handles mixed truthy/falsy isActive values', () => {
    const users = [
      { name: "Jeanne", isActive: 1 },
      { name: "Ivanne", isActive: 0 }
    ];
    expect(filterActiveUsers(users)).toEqual([{ name: "Jeanne", isActive: 1 }]);
  });
});

describe('logAction', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-11-27T13:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('logs action with username and timestamp', () => {
    expect(logAction("login", "Jeanne")).toBe(
      "User Jeanne performed login at 2025-11-27T13:00:00.000Z"
    );
  });

  it('logs different actions correctly', () => {
    expect(logAction("logout", "Chariey")).toBe(
      "User Chariey performed logout at 2025-11-27T13:00:00.000Z"
    );
  });

  it('handles empty username', () => {
    expect(logAction("login", "")).toBe(
      "User  performed login at 2025-11-27T13:00:000Z")
  });
});

