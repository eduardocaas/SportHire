using Bogus;
using SportHire.Identity.Core.Entities;

namespace SportHire.Identity.UnitTests.TestData.ObjectMothers
{
    public static class UserMother
    {
        private static readonly Faker _faker = new();

        public static User UserWithWallet
        {
            get
            {
                var user = new User(
                    _faker.Person.FullName,
                    _faker.Person.Email,
                    _faker.Internet.Password(length: 8)
                );

                var wallet = new Wallet { Balance = 0, User = user };
                user.Wallet = wallet;

                return user;
            }
        }
    }
}
