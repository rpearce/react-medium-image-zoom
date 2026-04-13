# Contributing

1. Check out the [issues](https://github.com/rpearce/react-medium-image-zoom/issues)
1. [Fork](https://guides.github.com/activities/forking/) this repository
1. [Clone](https://help.github.com/articles/cloning-a-repository/) your fork
1. Add the upstream project (this one) as a git remote:
   ```text
   $ git remote add upstream git@github.com:rpearce/react-medium-image-zoom.git
   $ git fetch upstream
   $ git rebase upstream/main
   ```
1. Check out a feature branch
   ```text
   $ git switch -C my-feature
   ```
1. Make your changes
1. Push your branch to your GitHub repo
   ```
   $ git push origin my-feature
   ```
1. Create a [pull request](https://help.github.com/articles/about-pull-requests/)
   from your branch to this repo's `main` branch
1. When all is merged, pull down the upstream changes to your `main`
   ```
   $ git checkout main
   $ git fetch upstream
   $ git rebase upstream/main
   ```
1. Delete your feature branch (locally and then on GitHub)
   ```
   $ git branch -D my-feature
   $ git push origin :my-feature
   ```

## Testing

Ensure sure your changes are adequately tested via the Storybook `stories/`, and
if automated testing is possible, feel free to add test coverage.
