namespace Website.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Game",
                c => new
                    {
                        GameID = c.Int(nullable: false, identity: true),
                        GameEnd = c.DateTime(nullable: false),
                        PlayerOneScore = c.Int(nullable: false),
                        PlayerTwoScore = c.Int(nullable: false),
                        PlayerOne_PlayerId = c.Int(),
                        PlayerTwo_PlayerId = c.Int(),
                    })
                .PrimaryKey(t => t.GameID)
                .ForeignKey("dbo.Player", t => t.PlayerOne_PlayerId)
                .ForeignKey("dbo.Player", t => t.PlayerTwo_PlayerId)
                .Index(t => t.PlayerOne_PlayerId)
                .Index(t => t.PlayerTwo_PlayerId);
            
            CreateTable(
                "dbo.Player",
                c => new
                    {
                        PlayerId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.PlayerId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Game", "PlayerTwo_PlayerId", "dbo.Player");
            DropForeignKey("dbo.Game", "PlayerOne_PlayerId", "dbo.Player");
            DropIndex("dbo.Game", new[] { "PlayerTwo_PlayerId" });
            DropIndex("dbo.Game", new[] { "PlayerOne_PlayerId" });
            DropTable("dbo.Player");
            DropTable("dbo.Game");
        }
    }
}
