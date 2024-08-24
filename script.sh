git add .

read -p "Enter commit message: " commit_message
git commit -m "$commit_message"

git push

echo "Changes have been added, committed, and pushed to the remote repository."
