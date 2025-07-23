from app import db
from app.models.user import User
from app.models.clubs import Club
from app.models.membership import Membership
from app.models.movie_series import MovieSeries
from app.models.posts import Post
from app.models.comments import Comment
from app.models.watchlist import Watchlist
from app.models.recommendations import Recommendation
from app.models.report import Report
from app.models.follow import Follow

def seed():
    db.drop_all()
    db.create_all()

    # Users
    user1 = User(username="alice", email="alice@example.com", password_hash="hash1", bio="Movie buff", favorite_genres=["Drama", "Comedy"])
    user2 = User(username="bob", email="bob@example.com", password_hash="hash2", bio="Series lover", favorite_genres=["Action"])
    db.session.add_all([user1, user2])
    db.session.commit()

    # Clubs
    club1 = Club(name="Drama Club", description="All about drama movies", genre="Drama", created_by=user1.id)
    club2 = Club(name="Action Fans", description="Action movies and series", genre="Action", created_by=user2.id)
    db.session.add_all([club1, club2])
    db.session.commit()

    # Memberships
    membership1 = Membership(user_id=user1.id, club_id=club1.id, role="admin")
    membership2 = Membership(user_id=user2.id, club_id=club1.id, role="member")
    membership3 = Membership(user_id=user2.id, club_id=club2.id, role="admin")
    db.session.add_all([membership1, membership2, membership3])
    db.session.commit()

    # MovieSeries
    movie1 = MovieSeries(title="The Great Drama", type="movie", description="A dramatic tale.", genre="Drama", release_year=2020, poster_url="http://example.com/drama.jpg")
    movie2 = MovieSeries(title="Action Blast", type="series", description="Explosive action.", genre="Action", release_year=2021, poster_url="http://example.com/action.jpg")
    db.session.add_all([movie1, movie2])
    db.session.commit()

    # Posts
    post1 = Post(user_id=user1.id, club_id=club1.id, movie_series_id=movie1.id, content="Loved this movie!", rating=5)
    post2 = Post(user_id=user2.id, club_id=club2.id, movie_series_id=movie2.id, content="Great action scenes.", rating=4)
    db.session.add_all([post1, post2])
    db.session.commit()

    # Comments
    comment1 = Comment(user_id=user2.id, post_id=post1.id, content="I agree, it was awesome!")
    comment2 = Comment(user_id=user1.id, post_id=post2.id, content="Not my style, but well made.")
    db.session.add_all([comment1, comment2])
    db.session.commit()

    # Watchlists
    watch1 = Watchlist(user_id=user1.id, movie_series_id=movie2.id, status="planned", notes="Watch next weekend")
    watch2 = Watchlist(user_id=user2.id, movie_series_id=movie1.id, status="watched", notes="Loved it")
    db.session.add_all([watch1, watch2])
    db.session.commit()

    # Recommendations
    rec1 = Recommendation(user_id=user1.id, movie_series_id=movie2.id, recommended_reason="Great for action fans")
    rec2 = Recommendation(user_id=user2.id, movie_series_id=movie1.id, recommended_reason="Must-watch drama")
    db.session.add_all([rec1, rec2])
    db.session.commit()

    # Reports
    report1 = Report(reporter_id=user2.id, post_id=post1.id, reason="Spam", status="pending")
    db.session.add(report1)
    db.session.commit()

    # Follows
    follow1 = Follow(follower_id=user1.id, followed_id=user2.id)
    db.session.add(follow1)
    db.session.commit()

    print("Database seeded!")

if __name__ == "__main__":
    seed()