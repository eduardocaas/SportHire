using Bogus;
using SportHire.Identity.Core.Entities;

namespace SportHire.Identity.UnitTests.TestData.ObjectMothers
{
    public static class UserMother
    {
        private static readonly Faker _faker = new();

        private static User User
        {
            get
            {
                var user = new User(
                    _faker.Person.FullName,
                    _faker.Person.Email,
                    _faker.Internet.Password(length: 8)
                );

                return user;
            }
        }

        public static User UserWithWallet
        {
            get
            {
                var user = User.Clone();

                var wallet = new Wallet { Balance = 1000, User = user };
                user.Wallet = wallet;

                return user;
            }
        }

        public static User UserWithoutWallet
            => User;
    }
}
