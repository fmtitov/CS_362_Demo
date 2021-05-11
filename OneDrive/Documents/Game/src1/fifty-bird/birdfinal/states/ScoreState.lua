--[[
    ScoreState Class
    Author: Colton Ogden
    cogden@cs50.harvard.edu

    A simple state used to display the player's score before they
    transition back into the play state. Transitioned to from the
    PlayState when they collide with a Pipe.
]]

ScoreState = Class{__includes = BaseState}

--[[
    When we enter the score state, we expect to receive the score
    from the play state so we know what to render to the State.
]]
function ScoreState:enter(params)
    self.score = params.score
end

function ScoreState:update(dt)
    -- go back to play if enter is pressed
    if love.keyboard.wasPressed('enter') or love.keyboard.wasPressed('return') then
        gStateMachine:change('countdown')
    end
end

function ScoreState:render()
    -- simply render the score to the middle of the screen
    love.graphics.setFont(flappyFont)
    love.graphics.printf('Oof! You lost!', 0, 64, VIRTUAL_WIDTH, 'center')

    love.graphics.setFont(mediumFont)
    love.graphics.print('Score: ' .. tostring(self.score), 190, 120)

    -- different final score messages and medals are awarded for different final scores
    -- bronze for less than 5, silver for 5-9, gold for 10+
    if self.score < 5 then
    love.graphics.printf('Nice try, but you still have a long way to go.', 0, 160, VIRTUAL_WIDTH, 'center')
    love.graphics.draw(love.graphics.newImage("flatmedal2.png"), VIRTUAL_WIDTH / 2 + 15, 95, 0, 1.0, 1.0)
    elseif self.score < 10 then
    love.graphics.printf('Nice job, you\'re good at this.', 0, 160, VIRTUAL_WIDTH, 'center')
    love.graphics.draw(love.graphics.newImage("flatmedal3.png"), VIRTUAL_WIDTH / 2 + 15, 95, 0, 1.0, 1.0)
    else 
    love.graphics.printf('Wow! You\'re a legend', 0, 160, VIRTUAL_WIDTH, 'center')
    love.graphics.draw(love.graphics.newImage("flatmedal8.png"), VIRTUAL_WIDTH / 2 + 15, 95, 0, 1.0, 1.0)
    end   


    love.graphics.printf('Press Enter to Play Again!', 0, 180, VIRTUAL_WIDTH, 'center')
end